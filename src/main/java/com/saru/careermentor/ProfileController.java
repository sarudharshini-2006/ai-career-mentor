package com.saru.careermentor;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;


    // =====================================================
    // SAVE / UPDATE PROFILE
    // =====================================================

    @PostMapping("/profile")
    public String saveProfile(@RequestBody Profile profile) {

        if (profile.getEmail() == null ||
            profile.getEmail().trim().isEmpty()) {

            return "Email is required.";
        }

        String email =
                profile.getEmail()
                        .trim()
                        .toLowerCase();

        profile.setEmail(email);


        // Check whether profile already exists
        Optional<Profile> existingProfile =
                profileRepository.findByEmail(email);


        if (existingProfile.isPresent()) {

            Profile oldProfile =
                    existingProfile.get();

            profile.setId(oldProfile.getId());
        }


        profileRepository.save(profile);

        return "Career profile saved successfully.";
    }


    // =====================================================
    // GET PROFILE
    // =====================================================

    @GetMapping("/profile/{email}")
    public Profile getProfile(
            @PathVariable String email) {

        return profileRepository
                .findByEmail(
                        email.trim().toLowerCase()
                )
                .orElse(null);
    }


    // =====================================================
    // DELETE PROFILE
    // =====================================================

    @DeleteMapping("/profile/{email}")
    public String deleteProfile(
            @PathVariable String email) {

        Optional<Profile> profile =
                profileRepository.findByEmail(
                        email.trim().toLowerCase()
                );

        if (profile.isEmpty()) {

            return "Profile not found.";
        }

        profileRepository.deleteById(
                profile.get().getId()
        );

        return "Career profile deleted successfully.";
    }
}