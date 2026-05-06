package com.Ai4EveryOne.Livyfy.auth.service;

import com.Ai4EveryOne.Livyfy.auth.dto.AuthResponse;
import com.Ai4EveryOne.Livyfy.auth.dto.LoginRequest;
import com.Ai4EveryOne.Livyfy.auth.dto.SignupRequest;
import com.Ai4EveryOne.Livyfy.auth.model.Role;
import com.Ai4EveryOne.Livyfy.auth.model.User;
import com.Ai4EveryOne.Livyfy.auth.repository.UserRepository;
import com.Ai4EveryOne.Livyfy.auth.security.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository repo, JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    public String signup(SignupRequest req) {
        User user = new User();
        user.setEmail(req.email);
        user.setPassword(req.password); // ⚠️ plain for MVP
        user.setRole(Role.valueOf(req.role));

        repo.save(user);

        return "User created";
    }

    public AuthResponse login(LoginRequest req) {
        User user = repo.findByEmail(req.email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(req.password)) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(token, user.getRole(), user.getEmail());
    }
}