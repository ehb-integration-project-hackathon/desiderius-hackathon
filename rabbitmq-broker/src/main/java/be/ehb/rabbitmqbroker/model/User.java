package be.ehb.rabbitmqbroker.model;

import java.util.Date;

public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Date birthDate;
    private String companyName;
    private Address personalAddress;
    private Address companyAddress;
}
