package be.ehb.rabbitmqbroker.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import jakarta.persistence.*;

import java.util.List;

@Entity
@JacksonXmlRootElement(localName = "Address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JacksonXmlProperty(localName = "Street")
    @JsonProperty("Street")
    private String street;
    @JacksonXmlProperty(localName = "Bus")
    @JsonProperty("Bus")
    private String bus;
    @JacksonXmlProperty(localName = "City")
    @JsonProperty("City")
    private String city;
    @JacksonXmlProperty(localName = "Zip")
    @JsonProperty("Zip")
    private String zip;
    @JacksonXmlProperty(localName = "Country")
    @JsonProperty("Country")
    private String country;

    @OneToMany(mappedBy = "address")
    //@Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<User> users;

    public Address(String street, String bus, String city, String zip, String country, List<User> users) {
        this.street = street;
        this.bus = bus;
        this.city = city;
        this.zip = zip;
        this.country = country;
        this.users = users;
    }

    public Address() {
    }

    // Getters and Setters

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getBus() {
        return bus;
    }

    public void setBus(String bus) {
        this.bus = bus;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Long getId() {
        return id;
    }
}
