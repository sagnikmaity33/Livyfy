package com.Ai4EveryOne.Livyfy.common.utils;

import com.Ai4EveryOne.Livyfy.auth.model.User;
import com.Ai4EveryOne.Livyfy.auth.repository.UserRepository;
import com.Ai4EveryOne.Livyfy.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthHelper {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public User getUserFromToken(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid token");
        }

        String token = header.substring(7);

        String email = jwtUtil.extractEmail(token);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}