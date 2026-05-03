package com.Ai4EveryOne.Livyfy.chatbot.dto;


import lombok.Data;
import java.util.List;

@Data
public class AIRecommendationRequest {

    private String query;
    private String previousContext;

    private List<ListingData> listings;

    @Data
    public static class ListingData {
        private Long id;
        private String title;
        private Double price;
        private Double distanceKm;
        private Double durationMinutes;
    }
}