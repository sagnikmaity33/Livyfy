package com.Ai4EveryOne.Livyfy.search.service;

import com.Ai4EveryOne.Livyfy.chatbot.dto.AIRecommendationRequest;
import com.Ai4EveryOne.Livyfy.listing.dto.ListingResponse;
import com.Ai4EveryOne.Livyfy.listing.model.Listing;
import com.Ai4EveryOne.Livyfy.listing.repository.ListingRepository;
import com.Ai4EveryOne.Livyfy.search.dto.HybridSearchRequest;
import com.Ai4EveryOne.Livyfy.transport.dto.TransportRequest;
import com.Ai4EveryOne.Livyfy.transport.dto.TransportResponse;
import com.Ai4EveryOne.Livyfy.transport.service.TransportServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final ListingRepository listingRepository;
    private final RestTemplate restTemplate;
    private final TransportServiceImpl transportService;




    public List<ListingResponse> hybridSearch(HybridSearchRequest request) {

        // 🔹 STEP 1: DB FILTER
        List<Listing> listings = listingRepository.findAll(); // later optimize

        List<Listing> filtered = listings.stream()
                .filter(l -> request.location == null || l.getLocation().equalsIgnoreCase(request.location))
                .filter(l -> request.maxPrice == null || l.getPrice() <= request.maxPrice)
                .filter(l -> request.verified == null || l.isVerified() == request.verified)
                .toList();

        if (filtered.isEmpty()) return List.of();

        // 🔹 STEP 2: SEND TO AI FOR RANKING
        try {
            Map<String, Object> body = Map.of(
                    "query", request.query,
                    "documents", filtered.stream()
                            .map(l -> l.getId() + "::" +
                                    l.getTitle() + ", " +
                                    l.getDescription() + ", " +
                                    l.getLocation() + ", " +
                                    l.getAmenities())
                            .toList()
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(
                            "http://ai-service:8000/rank",
                            entity,
                            Map.class
                    );

            List<String> ranked = (List<String>) response.getBody().get("results");

            // 🔹 STEP 3: MAP BACK TO LISTINGS
            return ranked.stream()
                    .map(r -> Long.parseLong(r.split("::")[0]))
                    .map(id -> filtered.stream()
                            .filter(l -> l.getId().equals(id))
                            .findFirst().orElse(null))
                    .filter(Objects::nonNull)
                    .map(this::mapToResponse)
                    .toList();

        } catch (Exception e) {
            // fallback → return filtered
            return filtered.stream().map(this::mapToResponse).toList();
        }
    }
    private ListingResponse mapToResponse(Listing listing) {
        ListingResponse res = new ListingResponse();
        res.id = listing.getId();
        res.title = listing.getTitle();
        res.description = listing.getDescription();
        res.price = listing.getPrice();
        res.location = listing.getLocation();
        res.amenities = listing.getAmenities();
        res.isVerified = listing.isVerified();
        res.ownerName = listing.getOwnerName();
        return res;
    }

    public AIRecommendationRequest buildAIRequest(String query) {

        List<Listing> listings = listingRepository.findAll();

        List<AIRecommendationRequest.ListingData> enriched = new ArrayList<>();

        for (Listing listing : listings) {

            // call transport service
            TransportRequest tr = new TransportRequest();
            tr.setWorkLat(22.5726);
            tr.setWorkLng(88.3639);

            List<TransportResponse> commute =
                    transportService.getCommuteOptions(tr);

            // match listing
            for (TransportResponse t : commute) {
                if (t.getListingId().equals(listing.getId())) {

                    AIRecommendationRequest.ListingData data =
                            new AIRecommendationRequest.ListingData();

                    data.setId(listing.getId());
                    data.setTitle(listing.getTitle());
                    data.setPrice( listing.getPrice());
                    data.setDistanceKm(t.getDistanceKm());
                    data.setDurationMinutes(t.getDurationMinutes());

                    enriched.add(data);
                }
            }
        }

        AIRecommendationRequest req = new AIRecommendationRequest();
        req.setQuery(query);
        req.setListings(enriched);

        return req;
    }
}