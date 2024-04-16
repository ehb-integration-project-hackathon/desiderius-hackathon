package RabbitMQ.service;

import RabbitMQ.validator.ValidateXML;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ElasticService {

    private static final String XSD_FILE = "validationUser.xsd";

    private final AmqpTemplate amqpTemplate;

    @Autowired
    public ElasticService(AmqpTemplate amqpTemplate) {
        this.amqpTemplate = amqpTemplate;
    }

    @RabbitListener(queues = "elastic-queue")
    public void receiveMessage(String xmlMessage) {
        // Validate the received XML message against XSD schema
        if (new ValidateXML().validateXml(xmlMessage, XSD_FILE)) {
            // Process the validated XML message
            System.out.println("ELASTIC Received and validated XML message: " + xmlMessage);

            // Send the validated message to fossBilling-queue
            amqpTemplate.convertAndSend("fossBilling-queue", xmlMessage);
            System.out.println("Message sent to fossBilling-queue.");
        } else {
            // Handle invalid XML message
            System.out.println("ELASTIC Received XML message is invalid.");
        }
    }
}
