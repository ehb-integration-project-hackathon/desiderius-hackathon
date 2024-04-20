package be.ehb.rabbitmqbroker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class RabbitmqBrokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(RabbitmqBrokerApplication.class, args);
	}

}
