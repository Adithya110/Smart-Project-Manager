package com.adithya.taskmanager.controller;

import com.adithya.taskmanager.model.User;
import com.adithya.taskmanager.repository.UserRepository;
import com.adithya.taskmanager.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        User user = userRepository.findByUsername(loginData.getUsername());
        if (user == null || !passwordEncoder.matches(loginData.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok().body(token);
    }
}
