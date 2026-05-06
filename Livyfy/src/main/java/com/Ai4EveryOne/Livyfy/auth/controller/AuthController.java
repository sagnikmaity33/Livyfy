package com.Ai4EveryOne.Livyfy.auth.controller;

import com.Ai4EveryOne.Livyfy.auth.dto.LoginRequest;
import com.Ai4EveryOne.Livyfy.auth.dto.SignupRequest;
import com.Ai4EveryOne.Livyfy.auth.service.AuthService;
import com.Ai4EveryOne.Livyfy.common.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public ApiResponse<?> signup(@RequestBody SignupRequest req) {
        return new ApiResponse<>(true, "Signup success", service.signup(req));
    }


    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody LoginRequest req) {
        return new ApiResponse<>(true, "Login success", service.login(req));
    }
}