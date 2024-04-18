package be.ehb.rabbitmqbroker.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

@JacksonXmlRootElement(localName = "Address")
public class Address {

    @JacksonXmlProperty(localName = "Street")
    private String street;
    @JacksonXmlProperty(localName = "Bus")
    private String bus;
    @JacksonXmlProperty(localName = "City")
    private String city;
    @JacksonXmlProperty(localName = "Zip")
    private String zip;
    @JacksonXmlProperty(localName = "Country")
    private String country;

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
}
