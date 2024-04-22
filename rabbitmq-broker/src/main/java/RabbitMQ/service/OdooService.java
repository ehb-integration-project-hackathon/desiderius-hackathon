//package RabbitMQ.service;
//
//import RabbitMQ.validator.ValidateXML;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.amqp.core.AmqpTemplate;
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestClientException;
//import org.springframework.web.client.RestTemplate;
//
//@Service
//public class OdooService {
//    private static final String CREATE_USER_ENDPOINT = "http://localhost:8069/api/partners";
//    private static final String XSD_FILE = "validationUser.xsd";
//
//    private final AmqpTemplate amqpTemplate;
//    private final RestTemplate restTemplate;
//    private final ObjectMapper objectMapper;
//
//    @Autowired
//    public OdooService(AmqpTemplate amqpTemplate, RestTemplate restTemplate, ObjectMapper objectMapper) {
//        this.amqpTemplate = amqpTemplate;
//        this.restTemplate = restTemplate;
//        this.objectMapper = objectMapper;
//    }
//
//    @RabbitListener(queues = "odoo-queue")
//    public void receiveAndSendMessage(String message) {
//      //  try {
//           // if (new ValidateXML().validateXml(message, XSD_FILE)) {
//
//                // Set headers for JSON content
//                HttpHeaders headers = new HttpHeaders();
//                headers.setContentType(MediaType.APPLICATION_JSON);
//
//                // Create request entity with message and headers
//                HttpEntity<String> requestEntity = new HttpEntity<>(message, headers);
//
//                // Send HTTP POST request to create user endpoint
//                ResponseEntity<String> responseEntity = restTemplate.postForEntity(CREATE_USER_ENDPOINT, requestEntity, String.class);
//
//                // Check response status and handle accordingly
//                if (responseEntity.getStatusCode() == HttpStatus.OK) {
//                    System.out.println("User created successfully.");
//                } else {
//                    System.out.println("Failed to create user: " + responseEntity.getBody());
//                }
//       //     }
////        }catch(RestClientException e){
////                System.out.println("Error creating user: " + e.getMessage());
////            }
//
//    }
//}
package RabbitMQ.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import RabbitMQ.validator.ValidateXML;
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

    private static final String XSD_FILE = "validationUser.xsd";
    private final RestTemplate restTemplate;

    public OdooService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @RabbitListener(queues = "odoo-queue")
    public void receiveAndSendMessage(String messageData) {
        System.out.println("ODOO RECEIVED=" + messageData);
        try {
            if (new ValidateXML().validateXml(messageData, XSD_FILE)) {
                // Parse XML message to extract CRUD and Uid values
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                InputSource is = new InputSource(new StringReader(messageData));
                Document doc = builder.parse(is);
                String crudValue = doc.getElementsByTagName("CRUD").item(0).getTextContent();
                String uidValue = doc.getElementsByTagName("Uid").item(0).getTextContent();

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









// Send the validated message to fossBilling-queue
//            amqpTemplate.convertAndSend("fossBilling-queue", xmlMessage);
//                    amqpTemplate.convertAndSend("elastic-queue", xmlMessage);
//                    amqpTemplate.convertAndSend("salesforce-queue", xmlMessage);
//                    amqpTemplate.convertAndSend("sendgrid-queue", xmlMessage);
//                    amqpTemplate.convertAndSend("wordpress-queue", xmlMessage);
//                    System.out.println("Message sent to ALL-queues.");

//package RabbitMQ.service;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//
//@Component
//public class OdooService {
//
//    private final RestTemplate restTemplate;
//
//    @Autowired
//    public OdooService(RestTemplate restTemplate) {
//        this.restTemplate = restTemplate;
//    }
//
//    public void fetchPartners() {
//        // Authenticate with Odoo
//        String sessionToken = authenticate("doganhasko@gmail.com", "odoo");
//
//        // Fetch partner information
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Cookie", "session_id=" + sessionToken);
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//
//        ResponseEntity<String> response = restTemplate.exchange(
//                "http://localhost:8069/api/v1/res.partner?limit=10",
//                HttpMethod.GET,
//                entity,
//                String.class
//        );
//
//        if (response.getStatusCode().is2xxSuccessful()) {
//            System.out.println("Partner information:");
//            System.out.println(response.getBody());
//        } else {
//            System.out.println("Error fetching partner information: " + response.getStatusCodeValue());
//        }
//    }
//
//    private String authenticate(String username, String password) {
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("db", "postgress");
//        requestBody.put("login", username);
//        requestBody.put("password", password);
//
//        ResponseEntity<String> response = restTemplate.postForEntity(
//                "http://localhost:8069/web/session/authenticate",
//                requestBody,
//                String.class
//        );
//
//        if (response.getStatusCode().is2xxSuccessful()) {
//            try {
//                ObjectMapper mapper = new ObjectMapper();
//                JsonNode jsonNode = mapper.readTree(response.getBody());
//                String sessionToken = jsonNode.get("result").get("session_id").asText();
//                return sessionToken;
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        } else {
//            System.out.println("Error authenticating: " + response.getStatusCodeValue());
//        }
//
//        return null;
//    }