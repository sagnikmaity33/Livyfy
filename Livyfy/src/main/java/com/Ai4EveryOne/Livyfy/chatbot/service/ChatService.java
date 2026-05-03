package com.Ai4EveryOne.Livyfy.chatbot.service;


import com.Ai4EveryOne.Livyfy.chatbot.dto.ChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final AIService aiService;

    public String handleMessage(ChatRequest request) {

        String msg = request.getMessage().toLowerCase();

        // 🧠 lightweight intent detection (DO NOT OVERDO)
        if (msg.contains("pg") || msg.contains("rent")) {
            return aiService.getRecommendations(request.getMessage(), request.getPreviousContext()).toString();
        }

        return "Tell me your budget, workplace, or preferences.";
    }
}