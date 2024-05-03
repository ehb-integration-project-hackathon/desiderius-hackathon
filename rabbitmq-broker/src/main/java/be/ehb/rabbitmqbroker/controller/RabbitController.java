package be.ehb.rabbitmqbroker.controller;
import be.ehb.rabbitmqbroker.service.ConversionService;
import be.ehb.rabbitmqbroker.service.SenderService;
import be.ehb.rabbitmqbroker.service.UuidService;
import be.ehb.rabbitmqbroker.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map; // Importing Map
import java.util.HashMap; // Importing HashMap
import java.util.Collections; // Importing Collections
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import be.ehb.rabbitmqbroker.repository.UserRepository;
import be.ehb.rabbitmqbroker.repository.UuidRepository;
import java.util.Optional;
import be.ehb.rabbitmqbroker.model.User;
import be.ehb.rabbitmqbroker.model.Uuid;
@RestController
public class RabbitController {

    private final SenderService senderService;
    private final ConversionService conversionService;
    private final ValidationService validationService;
    private final UuidService uuidService;


    @Autowired
    public RabbitController(SenderService senderService, ConversionService conversionService, ValidationService validationService, UuidService uuidService) {
        this.senderService = senderService;
        this.conversionService = conversionService;
        this.validationService = validationService;
        this.uuidService = uuidService;
    }

    @PostMapping(value = "/new-user", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void newUserWordpress(@RequestBody String json) {
        System.out.println("post-request");
        System.out.println(json);

        try {
            // Add user to UUID database
            String uuid = uuidService.newUuidUser(json, "wordpress");
            System.out.println("uuid: " + uuid);

            // Convert JSON to XML
            String xmlString = conversionService.wordpressUserJsonToXml(json, uuid);
            System.out.println("xmlString: " + xmlString);

            // Validate XML against XSD
            boolean isValid = validationService.validateXmlUser(xmlString);

            if (isValid) {
                System.out.println("Validation successful.");
                System.out.println(xmlString);

                // Send the validated XML to all queues using their respective routing keys
                senderService.sendToQueue("salesforce-route", xmlString);
                senderService.sendToQueue("elastic-route", json);
                senderService.sendToQueue("odoo-route", xmlString);
                senderService.sendToQueue("fossBilling-route", xmlString);
                senderService.sendToQueue("sendgrid-route", xmlString);

                senderService.sendToQueue("wordpress-route", xmlString);
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

    @PostMapping(value = "/new-user-elk", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void newUserElk(@RequestBody String json) {
        System.out.println("post-request");
        System.out.println(json);

        try {
            // Add user to UUID database
            String uuid = uuidService.newUuidUser(json, "wordpress");
            System.out.println("uuid: " + uuid);

            // Convert JSON to XML
            String xmlString = conversionService.wordpressUserJsonToXml(json, uuid);
            System.out.println("xmlString: " + xmlString);

            // Validate XML against XSD
            boolean isValid = validationService.validateXmlUser(xmlString);

            if (isValid) {
                System.out.println("Validation successful.");
                System.out.println(xmlString);

                // Send the validated XML to all queues using their respective routing keys
                senderService.sendToQueue("salesforce-route", xmlString);
                senderService.sendToQueue("elastic-route", json);
                senderService.sendToQueue("odoo-route", xmlString);
                senderService.sendToQueue("fossBilling-route", xmlString);
                senderService.sendToQueue("sendgrid-route", xmlString);

                senderService.sendToQueue("wordpress-route", xmlString);
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

    @PostMapping(value = "/new-Odoouser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> newUserOdoo(@RequestBody String json) {
        try {
            // Add user to UUID database
            System.out.println("received XML: " + json);

            // Add user to UUID database
            String uuid = uuidService.newUuidUser(json, "odoo");
            System.out.println("uuid: " + uuid);

            // Construct JSON response with the UUID
            Map<String, String> response = new HashMap<>();
            response.put("uuid", uuid);

            // Return JSON response with the UUID
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error occurred"));
        }
    }


    @PutMapping(value = "/Odoo-update-user/{uuid}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@PathVariable String uuid, @RequestBody User updatedUser) {
        if (uuidService.updateUuidUser(uuid, updatedUser)){
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/delete-Odoouser/{uuid}")
    public ResponseEntity<String> deleteUser(@PathVariable String uuid) {
        try {
            // Delete the user from the UUID database
            uuidService.deleteUuidUser(uuid);

            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }

}
