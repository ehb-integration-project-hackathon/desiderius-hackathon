package be.ehb.rabbitmqbroker.service.listener;

import be.ehb.rabbitmqbroker.model.User;
import be.ehb.rabbitmqbroker.service.ValidationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WordpressService {

    private final AmqpTemplate amqpTemplate;
    private final Binding binding;
    private final ValidationService validationService;
    private final RestTemplate restTemplate;
    private final String webhookUrl = "http://wordpress/?wpwhpro_action=new-user&wpwhpro_api_key=4c2liet0819yw6ua0wc7ofybiqgzwde7acyvb3a2fr7rmwpmkkrw0mtkaofqgfqg";
    private final String apiKey = "4c2liet0819yw6ua0wc7ofybiqgzwde7acyvb3a2fr7rmwpmkkrw0mtkaofqgfqg";


    public WordpressService(AmqpTemplate amqpTemplate, Binding bindingWordpress, ValidationService validationService, RestTemplate restTemplate) {
        this.amqpTemplate = amqpTemplate;
        this.binding = bindingWordpress;
        this.validationService = validationService;
        this.restTemplate = restTemplate;
    }

    @RabbitListener(queues = "wordpress-queue")
    public void receiveMessage(String xmlString) {
        try {
            // Validate XML against XSD
            boolean isValid = validationService.validateXmlUser(xmlString);

            if (isValid) {
                System.out.println("Validation wordpress-listener successful.");
                String json = generateJson(xmlString);
                System.out.println("Generating new JSON in wordpress-listener: \n" + json);

                // Send validated XML to the Docker container's webhook with API key in the header
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                //headers.setBearerAuth(apiKey); // Set API key as Bearer token
                HttpEntity<String> request = new HttpEntity<>(json, headers);
                String response = restTemplate.postForObject(webhookUrl, request, String.class);
                System.out.println("Response from Wordpress webhook: " + response);
            } else {
                System.out.println("Validation failed.");
                System.out.println(xmlString);
                // Handle validation failure...
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Handle errors...
        }
    }

    private String generateJson(String xmlString) throws JsonProcessingException {
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.registerModule(new JavaTimeModule()); // Handle Java 8 Date/Time types
        xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // Ignore unknown properties
        User user = xmlMapper.readValue(xmlString, User.class);

        return "{\n" +
                "  \"action\": \"create_user\",\n" +
                "  \"user_email\": \"" + user.getEmail() + "\",\n" +
                "  \"first_name\": \"" + user.getFirstName() + "\",\n" +
                "  \"user_login\": \"" + user.getFirstName() + "\",\n" +
                "  \"last_name\": \"" + user.getLastName() + "\"\n" +
                "}";
    }
}