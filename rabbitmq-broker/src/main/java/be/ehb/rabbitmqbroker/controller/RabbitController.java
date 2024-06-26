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
        System.out.println("post-request newUserWordpress: \n" + json);

        try {
            // Add user to UUID database and get the newly created UUID
            String uuid = uuidService.newUuidUser(json, "wordpress");
            System.out.println("newUserWordpress uuid: " + uuid);

            // Convert JSON to XML and add UUID to XML
            String xmlString = conversionService.wordpressUserJsonToXml(json, uuid);
            System.out.println("newUserWordpress xmlString with UUID added: " + xmlString);

            // Validate XML against XSD
            boolean isValid = validationService.validateXmlUser(xmlString);

            if (isValid) {
                System.out.println("newUserWordpress Validation successful.: \n Putting XML message on queues: \n" + xmlString);

                // Send the validated XML to all queues using their respective routing keys
                senderService.sendToQueue("salesforce-route", xmlString);
                senderService.sendToQueue("elastic-route", json);
                senderService.sendToQueue("odoo-route", xmlString);
                senderService.sendToQueue("fossBilling-route", xmlString);
                senderService.sendToQueue("sendgrid-route", xmlString);
                //senderService.sendToQueue("wordpress-route", xmlString);
            } else {
                System.out.println("newUserWordpress Validation failed: \n" + xmlString);
                // Handle validation failure...
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Handle errors...
        }
    }

    @PostMapping(value = "/new-user-elk", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void newUserElk(@RequestBody String json) {
        System.out.println("post-request newUserElk: \n" + json);

        try {
            // Add user to UUID database and get the newly created UUID
            String uuid = uuidService.newUuidUser(json, "wordpress");
            System.out.println("newUserElk uuid: " + uuid);

            // Convert JSON to XML and add UUID to XML
            String xmlString = conversionService.wordpressUserJsonToXml(json, uuid);
            System.out.println("newUserElk xmlString with UUID added: " + xmlString);

            // Validate XML against XSD
            boolean isValid = validationService.validateXmlUser(xmlString);

            if (isValid) {
                System.out.println("newUserElk Validation successful.: \n Putting XML message on queues: \n" + xmlString);

                // Send the validated XML to all queues using their respective routing keys
                senderService.sendToQueue("salesforce-route", xmlString);
                //senderService.sendToQueue("elastic-route", json);
                senderService.sendToQueue("odoo-route", xmlString);
                senderService.sendToQueue("fossBilling-route", xmlString);
                senderService.sendToQueue("sendgrid-route", xmlString);
                senderService.sendToQueue("wordpress-route", xmlString);
            } else {
                System.out.println("newUserElk Validation failed: \n" + xmlString);
                // Handle validation failure...
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Handle errors...
        }
    }

    @PostMapping(value = "/new-Odoouser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> newUserOdoo(@RequestBody String json) {
        System.out.println("post-request newUserOdoo: \n" + json);
        try {
            // Add user to UUID database
            String uuid = uuidService.newUuidUser(json, "odoo");
            System.out.println("newUserOdoo uuid: " + uuid);

            // Construct JSON response with the UUID
            Map<String, String> response = new HashMap<>();
            response.put("uuid", uuid);

            System.out.println("newUserOdoo sending back UUID" + response);
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
