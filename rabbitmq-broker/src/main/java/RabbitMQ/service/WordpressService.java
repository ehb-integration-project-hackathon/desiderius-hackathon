package RabbitMQ.service;

import RabbitMQ.validator.ValidateXML;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class WordpressService {


    private static final String XSD_FILE = "validationUser.xsd";


    @RabbitListener(queues = "wordpress-queue")
    public void receiveMessage(String xmlMessage) {
        // Validate the received XML message against XSD schema
        if (new ValidateXML().validateXml(xmlMessage, XSD_FILE)) {
            // Process the validated XML message
            System.out.println("WORDPRESS Received and validated XML message: " + xmlMessage);
        } else {
            // Handle invalid XML message
            System.out.println("Received XML message is invalid.");
        }
    }

}
