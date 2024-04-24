package be.ehb.rabbitmqbroker.service;

import be.ehb.rabbitmqbroker.model.User;
import be.ehb.rabbitmqbroker.model.Uuid;
import be.ehb.rabbitmqbroker.repository.AddressRepository;
import be.ehb.rabbitmqbroker.repository.UserRepository;
import be.ehb.rabbitmqbroker.repository.UuidRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.util.StdDateFormat;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.TimeZone;

@Service
public class UuidService {

    private final UuidRepository uuidRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public UuidService(UuidRepository uuidRepository, UserRepository userRepository, AddressRepository addressRepository) {
        this.uuidRepository = uuidRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    // Method to create a new UUID for a user
    public String newUuidUser(String jsonUser, String serviceName) throws JsonProcessingException {
        // Initialize ObjectMapper with JavaTimeModule for handling Java 8 date/time types
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        // Disable feature to adjust dates to context time zone
        mapper.disable(DeserializationFeature.ADJUST_DATES_TO_CONTEXT_TIME_ZONE);

        // Set custom date format for deserialization
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        mapper.setDateFormat(new StdDateFormat().withColonInTimeZone(false).withTimeZone(TimeZone.getDefault()));
        mapper.setDateFormat(new StdDateFormat().withColonInTimeZone(true));

        // Register custom deserializer for LocalDate
        SimpleModule module = new SimpleModule();
        module.addDeserializer(LocalDate.class, new LocalDateDeserializer(dateFormatter));
        mapper.registerModule(module);

        // Deserialize JSON user string into User object
        User user = mapper.readValue(jsonUser, User.class);

        // Create a timestamp for creation and update time
        Timestamp timestamp = new Timestamp(new Date().getTime());

        // Create a new UUID entity
        Uuid uuid = new Uuid();
        uuid.setUser(user);
        uuid.setType("User");
        uuid.setDescription("This is a user");
        uuid.setCreatedBy(serviceName);
        uuid.setCreatedOn(timestamp);
        uuid.setUpdatedBy(serviceName);
        uuid.setUpdatedOn(timestamp);
        uuid.setVersion(1);

        // Save the UUID entity to the database
        Uuid savedUUID = uuidRepository.save(uuid);

        return savedUUID.getUuid();
    }

    // Method to update UUID for a user
    public String updateUuidUser(String value) {
        // Implement logic for updating UUID
        return "";
    }
}
