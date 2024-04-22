package be.ehb.rabbitmqbroker.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

import java.time.LocalDate;
@Entity
@JacksonXmlRootElement(localName = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JacksonXmlProperty(localName = "FirstName")
    @JsonProperty("FirstName")
    private String firstName;

    @JacksonXmlProperty(localName = "LastName")
    @JsonProperty("LastName")
    private String lastName;

    @JacksonXmlProperty(localName = "BirthDate")
    @JsonProperty("BirthDate")
    private LocalDate birthDate;

    @JacksonXmlProperty(localName = "Email")
    @JsonProperty("Email")
    private String email;

    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JacksonXmlProperty(localName = "Address")
    @JsonProperty("Address")
    private Address address;

    public User(String firstName, String lastName, LocalDate birthDate, String email, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.address = address;
    }

    public User() {}

    // Getters and Setters

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
