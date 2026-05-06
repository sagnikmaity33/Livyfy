package com.Ai4EveryOne.Livyfy.auth.dto;

import com.Ai4EveryOne.Livyfy.auth.model.Role;

public class AuthResponse {
    public String token;
    public Role role;
    public String email;

    public AuthResponse(String token, Role role, String email) {
        this.token = token;
        this.role = role;
        this.email = email;
    }
}