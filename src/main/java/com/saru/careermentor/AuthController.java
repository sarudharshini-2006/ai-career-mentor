package com.saru.careermentor;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        if (user.getName() == null ||
            user.getName().trim().isEmpty()) {

            return "Please enter your name.";
        }

        if (user.getEmail() == null ||
            user.getEmail().trim().isEmpty()) {

            return "Please enter your email.";
        }

        if (user.getPassword() == null ||
            user.getPassword().trim().isEmpty()) {

            return "Please enter your password.";
        }

        String email = user.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            return "Email already registered.";
        }

        user.setEmail(email);

        userRepository.save(user);

        return "Registration successful.";
    }


    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {

        if (loginUser.getEmail() == null ||
            loginUser.getPassword() == null) {

            return "Please enter email and password.";
        }

        String email =
                loginUser.getEmail()
                        .trim()
                        .toLowerCase();

        Optional<User> existingUser =
                userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            return "User not found.";
        }

        User user = existingUser.get();

        if (!user.getPassword()
                .equals(loginUser.getPassword())) {

            return "Invalid password.";
        }

        return "Login successful. Welcome "
                + user.getName()
                + "!";
    }
}