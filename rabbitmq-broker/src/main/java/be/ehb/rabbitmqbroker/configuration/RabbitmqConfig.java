package be.ehb.rabbitmqbroker.configuration;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitmqConfig {

    //Exchange configurations
    private static final String EXCHANGE_NAME = "hackathon";
    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(EXCHANGE_NAME);
    }

    //Queue configurations
    @Bean
    public Queue salesforce() {
        return new Queue("salesforce-queue");
    }
    @Bean
    public Queue elastic() {
        return new Queue("elastic-queue");
    }
    @Bean
    public Queue odoo() {
        return new Queue("odoo-queue");
    }
    @Bean
    public Queue fossBilling() {
        return new Queue("fossBilling-queue");
    }
    @Bean
    public Queue wordpress() {
        return new Queue("wordpress-queue");
    }
    @Bean
    public Queue sendgrid() {
        return new Queue("sendgrid-queue");
    }

    //Binding configuration
    @Bean
    public Binding bindingSalesforce(DirectExchange directExchange, Queue salesforce) {
        return BindingBuilder.bind(salesforce)
                .to(directExchange)
                .with("salesforce-route");
    }
    @Bean
    public Binding bindingElastic(DirectExchange directExchange, Queue elastic) {
        return BindingBuilder.bind(elastic)
                .to(directExchange)
                .with("elastic-route");
    }
    @Bean
    public Binding bindingOdoo(DirectExchange directExchange, Queue odoo) {
        return BindingBuilder.bind(odoo)
                .to(directExchange)
                .with("odoo-route");
    }
    @Bean
    public Binding bindingFossBilling(DirectExchange directExchange, Queue fossBilling) {
        return BindingBuilder.bind(fossBilling)
                .to(directExchange)
                .with("fossBilling-route");
    }
    @Bean
    public Binding bindingWordpress(DirectExchange directExchange, Queue wordpress) {
        return BindingBuilder.bind(wordpress)
                .to(directExchange)
                .with("wordpress-route");
    }
    @Bean
    public Binding bindingSendgrid(DirectExchange directExchange, Queue sendgrid) {
        return BindingBuilder.bind(sendgrid)
                .to(directExchange)
                .with("sendgrid-route");
    }
}