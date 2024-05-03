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
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

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

    public boolean updateUuidUser( String uuid, User updatedUser){
        // Find the existing Uuid entity by its uuid
        Optional<Uuid> existingUuidOptional = uuidRepository.findByUuid(uuid);
        if (existingUuidOptional.isPresent()) {
            Uuid existingUuid = existingUuidOptional.get();

            // Update the user information
            User user = existingUuid.getUser();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setAddress(updatedUser.getAddress());
            // Update other user properties as needed

            // Save the updated user
            userRepository.save(user);

            return true;
        } else {
            return false;
        }
    }


    public void updateUuidUserOld(String jsonUser, String uuidIdentifier, String serviceName) throws JsonProcessingException {
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

        // Retrieve the existing UUID entity from the database based on the given UUID identifier
        Optional<Uuid> optionalUuid = uuidRepository.findByUuid(uuidIdentifier);
        System.out.println("To be update found="+optionalUuid);
        if (optionalUuid.isPresent()) {
            Uuid uuid = optionalUuid.get();

            // Update the user details
            uuid.setUser(user);
            // Update other fields if necessary
            uuid.setUpdatedBy(serviceName);
            uuid.setUpdatedOn(new Timestamp(new Date().getTime()));
            System.out.println("Before saving");
            // Save the updated UUID entity to the database
            uuidRepository.save(uuid);
            System.out.println("After saving");

        } else {
            // Handle case when UUID entity with given identifier does not exist
            System.out.println("UUID with identifier " + uuidIdentifier + " not found");
        }
    }

    public void deleteUuidUser(String uuid) {
        // Find the UUID entity by its UUID
        Optional<Uuid> existingUuid = uuidRepository.findByUuid(uuid);

        if (existingUuid.isPresent()) {
            // Delete the UUID entity
            uuidRepository.delete(existingUuid.get());
        } else {
            // Handle the case when the UUID is not found
            System.out.println("USER DOES NOT EXIST");
        }
    }

}
