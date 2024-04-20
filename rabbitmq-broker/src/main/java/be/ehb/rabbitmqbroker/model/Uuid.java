package be.ehb.rabbitmqbroker.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Date;

@Entity
public class Uuid {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;
    @Column(name = "type", nullable = false)
    private String type;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "createdBy", nullable = false)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private String createdBy;

    @Column(name = "createdOn", nullable = false)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp createdOn;
    @Column(name = "updatedBy", nullable = false)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")

    private String updatedBy;
    @Column(name = "updatedOn", nullable = false)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Timestamp updatedOn;

    @Column(name = "version", nullable = false)
    private Integer version;



    public Uuid(String type, User user, String description, String createdBy, Timestamp createdOn, String updatedBy, Timestamp updatedOn, Integer version) {
        this.type = type;
        this.user = user;
        this.description = description;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
        this.version = version;
    }

    public Uuid() {
    }

    public String getUuid() {
        return uuid;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Timestamp getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Timestamp updatedOn) {
        this.updatedOn = updatedOn;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
