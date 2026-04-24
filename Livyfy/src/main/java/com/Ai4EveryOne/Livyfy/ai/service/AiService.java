package com.Ai4EveryOne.Livyfy.ai.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

@Service
public class AiService {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String AI_URL = "http://ai-service:8000/query";

    public String askAI(String query) {

        Map<String, String> request = Map.of("query", query);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(AI_URL, entity, Map.class);

        Map responseBody = response.getBody();

        if (responseBody == null || !responseBody.containsKey("results")) {
            return "No results from AI";
        }

        return responseBody.get("results").toString();
    }
}