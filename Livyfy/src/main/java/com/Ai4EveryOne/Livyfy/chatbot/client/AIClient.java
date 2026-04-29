package com.Ai4EveryOne.Livyfy.chatbot.client;

import com.Ai4EveryOne.Livyfy.chatbot.dto.AIRecommendationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class AIClient {

    private final RestTemplate restTemplate;

    public String getRecommendations(AIRecommendationRequest request) {

        String url = "http://ai-service:8000/recommend";

        return restTemplate.postForObject(url, request, String.class);
    }
}
