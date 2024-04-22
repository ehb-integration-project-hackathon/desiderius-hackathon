package be.ehb.rabbitmqbroker.service;

import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SenderService {

    private RabbitTemplate template;
    private DirectExchange directExchange;

    @Autowired
    public SenderService(RabbitTemplate template, DirectExchange directExchange) {
        this.template = template;
        this.directExchange = directExchange;
    }

    public void sendToQueue(String routingKey, String message) {
        // Send the message to the queue with the given routing key
        this.template.convertAndSend(directExchange.getName(), routingKey, message);
    }


}
