package be.ehb.rabbitmqbroker.repository;

import be.ehb.rabbitmqbroker.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
