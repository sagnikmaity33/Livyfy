package com.Ai4EveryOne.Livyfy.chatbot.controller;

import com.Ai4EveryOne.Livyfy.chatbot.service.AIService;

import com.Ai4EveryOne.Livyfy.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/recommend")
    public ApiResponse<?> recommend(@RequestParam String query) {
        return ApiResponse.success(
                "AI recommendations",
                aiService.getRecommendations(query)
        );
    }
}