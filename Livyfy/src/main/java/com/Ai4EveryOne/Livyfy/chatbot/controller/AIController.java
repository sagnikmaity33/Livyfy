package com.Ai4EveryOne.Livyfy.chatbot.controller;

import com.Ai4EveryOne.Livyfy.chatbot.dto.AIRecommendationRequest;
import com.Ai4EveryOne.Livyfy.chatbot.dto.ChatRequest;
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
    public ApiResponse<?> recommend(@RequestBody ChatRequest request) {
        return ApiResponse.success(
                "AI recommendations",
                aiService.getRecommendations(
                        request.getMessage(),
                        request.getPreviousContext()
                )
        );
    }

    @PostMapping("/debate")
    public ApiResponse<?> debate(@RequestBody AIRecommendationRequest req) {
        return ApiResponse.success(
                "AI debate result",
                aiService.debateAI(req)
        );
    }
}


