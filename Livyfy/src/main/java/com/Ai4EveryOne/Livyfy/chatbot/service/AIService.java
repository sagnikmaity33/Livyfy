package com.Ai4EveryOne.Livyfy.chatbot.service;

import com.Ai4EveryOne.Livyfy.chatbot.dto.AIRecommendationRequest;
import com.Ai4EveryOne.Livyfy.chatbot.dto.DebateResponse;
import com.Ai4EveryOne.Livyfy.listing.model.Listing;
import com.Ai4EveryOne.Livyfy.listing.repository.ListingRepository;
import com.Ai4EveryOne.Livyfy.transport.dto.TransportRequest;
import com.Ai4EveryOne.Livyfy.transport.dto.TransportResponse;
import com.Ai4EveryOne.Livyfy.transport.service.TransportService;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AIService {

    private final ListingRepository listingRepository;
    private final TransportService transportService;
    private final RestTemplate restTemplate;


    private String aiServiceUrl;

    public Object getRecommendations(String query, String previousContext) {

        // Step 1: fetch listings
        List<Listing> listings = listingRepository.findAll();

        // Step 2: build transport request (TEMP STATIC)
        TransportRequest tr = new TransportRequest();
        tr.setWorkLat(22.5726);
        tr.setWorkLng(88.3639);

        List<TransportResponse> commuteList =
                transportService.getCommuteOptions(tr);

        // Step 3: map commute by listingId
        Map<Long, TransportResponse> commuteMap = new HashMap<>();
        for (TransportResponse t : commuteList) {
            commuteMap.put(t.getListingId(), t);
        }

        // Step 4: enrich listings
        List<AIRecommendationRequest.ListingData> enriched = new ArrayList<>();

        for (Listing listing : listings) {

            if (!commuteMap.containsKey(listing.getId())) continue;

            TransportResponse t = commuteMap.get(listing.getId());

            AIRecommendationRequest.ListingData data =
                    new AIRecommendationRequest.ListingData();

            data.setId(listing.getId());
            data.setTitle(listing.getTitle());

            // SAFE PRICE HANDLING
            data.setPrice(
                    listing.getPrice() != null ? listing.getPrice() : 0.0
            );

            data.setDistanceKm(t.getDistanceKm());
            data.setDurationMinutes(t.getDurationMinutes());

            enriched.add(data);
        }

        // Step 5: build request
        AIRecommendationRequest req = new AIRecommendationRequest();
        req.setQuery(query);
        req.setListings(enriched);
        req.setPreviousContext(previousContext);
        // Step 6: call AI service
        String url = "http://ai-service:8000/recommend";

        return restTemplate.postForObject(url, req, Object.class);
    }
    public Object debateAI(AIRecommendationRequest request) {

        return restTemplate.postForObject(
                "http://ai-service:8000/debate-ai",
                request,
                Object.class
        );
    }

}