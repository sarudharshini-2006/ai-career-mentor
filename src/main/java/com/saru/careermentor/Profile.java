package com.saru.careermentor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "profiles")
public class Profile {

    @Id
    private String id;

    private String email;
    private String name;
    private String education;
    private String skills;
    private String interests;
    private String targetRole;
    private String location;

    public Profile() {
    }

    public Profile(
            String email,
            String name,
            String education,
            String skills,
            String interests,
            String targetRole,
            String location) {

        this.email = email;
        this.name = name;
        this.education = education;
        this.skills = skills;
        this.interests = interests;
        this.targetRole = targetRole;
        this.location = location;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getEducation() {
        return education;
    }

    public String getSkills() {
        return skills;
    }

    public String getInterests() {
        return interests;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public String getLocation() {
        return location;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}