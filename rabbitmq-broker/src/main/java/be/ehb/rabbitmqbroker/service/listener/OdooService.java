package be.ehb.rabbitmqbroker.service.listener;
import be.ehb.rabbitmqbroker.service.ValidationService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;

@Service
public class OdooService {

    private static final String CREATE_USER_ENDPOINT = "http://odoo:8069/api/partners";
    private static final String UPDATE_USER_ENDPOINT = "http://odoo:8069/api/partners/";
    private static final String DELETE_USER_ENDPOINT = "http://odoo:8069/api/partners/";

    private final RestTemplate restTemplate;
    private final ValidationService validationService;

    public OdooService(RestTemplate restTemplate, ValidationService validationService) {
        this.restTemplate = restTemplate;
        this.validationService = validationService;
    }

    @RabbitListener(queues = "odoo-queue")
    public void receiveAndSendMessage(String messageData) {
        System.out.println("ODOO RECEIVED=" + messageData);
        try {
            if (validationService.validateXmlUser(messageData)) {
                // Parse XML message to extract CRUD and Uid values
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                InputSource is = new InputSource(new StringReader(messageData));
                Document doc = builder.parse(is);
                String crudValue = doc.getElementsByTagName("CRUD").item(0).getTextContent();
                String uidValue = doc.getElementsByTagName("Uuid").item(0).getTextContent();

                // Set headers for XML content
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_XML);

                // Create request entity with XML data and headers
                HttpEntity<String> requestEntity = new HttpEntity<>(messageData, headers);

                if ("Create".equalsIgnoreCase(crudValue)) {
                    // Send HTTP POST request to create partner endpoint
                    restTemplate.postForObject(CREATE_USER_ENDPOINT, requestEntity, String.class);
                    System.out.println("POSTED=" + requestEntity);
                } else if ("Update".equalsIgnoreCase(crudValue)) {
                    // Send HTTP PUT request to update partner endpoint
                    restTemplate.put(UPDATE_USER_ENDPOINT + uidValue, requestEntity);
                    System.out.println("UPDATED to address=" + UPDATE_USER_ENDPOINT + uidValue);
                    System.out.println("UPDATED=" + requestEntity);
                } else if ("Delete".equalsIgnoreCase(crudValue)) {
                    // Send HTTP DELETE request to delete partner endpoint
                    System.out.println("DELETED from address=" + DELETE_USER_ENDPOINT + uidValue);
                    restTemplate.delete(DELETE_USER_ENDPOINT + uidValue);

                }
            }
        } catch (RestClientException e) {
            System.out.println("Error posting user data: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}