package be.ehb.rabbitmqbroker.repository;

import be.ehb.rabbitmqbroker.model.Uuid;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UuidRepository extends JpaRepository<Uuid, Long> {

    Optional<Uuid> findByUuid(String uuid);
    void deleteByUuid(String uuid);
}
