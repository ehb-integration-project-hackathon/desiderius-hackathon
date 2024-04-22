package be.ehb.rabbitmqbroker.service.listener;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class OdooService {

//    private static final String XSD_FILE = "src/main/resources/validationUser.xsd";
//    @RabbitListener(queues = "odoo-queue")
//    public void receiveMessage(String xmlMessage) {
//        // Validate the received XML message against XSD schema
//        if (new ValidateXML().validateXml(xmlMessage, XSD_FILE)) {
//            // Process the validated XML message
//            System.out.println("Received and validated XML message: " + xmlMessage);
//        } else {
//            // Handle invalid XML message
//            System.out.println("Received XML message is invalid.");
//        }
//    }
}
