package be.ehb.rabbitmqbroker.repository;

import be.ehb.rabbitmqbroker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByFirstNameAndLastNameAndEmail(String firstName, String lastName, String email);
}
