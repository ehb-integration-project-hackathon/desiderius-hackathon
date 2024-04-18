package be.ehb.rabbitmqbroker.controller;
import be.ehb.rabbitmqbroker.service.ConversionService;
import be.ehb.rabbitmqbroker.service.SenderService;
import be.ehb.rabbitmqbroker.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RabbitController {

    SenderService senderService;
    ConversionService conversionService;
    ValidationService validationService;

    @Autowired
    public RabbitController(SenderService senderService, ConversionService conversionService, ValidationService validationService) {
        this.senderService = senderService;
        this.conversionService = conversionService;
        this.validationService = validationService;
    }

    @PostMapping(value = "/new-user")
    public void newUser(@RequestBody String json) {
        System.out.println("post-request");

        try {
            // Convert JSON to XML
            String xmlString = conversionService.wordpressUserJsonToXml(json);

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
}
