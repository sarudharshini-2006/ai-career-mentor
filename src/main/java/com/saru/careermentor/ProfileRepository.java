package com.saru.careermentor;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository extends MongoRepository<Profile, String> {

    Optional<Profile> findByEmail(String email);

    boolean existsByEmail(String email);

    void deleteByEmail(String email);
}