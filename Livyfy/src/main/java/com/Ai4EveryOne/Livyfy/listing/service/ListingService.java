package com.Ai4EveryOne.Livyfy.listing.service;



import com.Ai4EveryOne.Livyfy.listing.dto.ListingRequest;
import com.Ai4EveryOne.Livyfy.listing.dto.ListingResponse;
import com.Ai4EveryOne.Livyfy.listing.model.Listing;
import com.Ai4EveryOne.Livyfy.listing.repository.ListingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.*;


@Service

public class ListingService {

    private static final Logger log = LoggerFactory.getLogger(ListingService.class);
    private final ListingRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();


    public ListingService(ListingRepository repository) {
        this.repository = repository;
    }

    public ListingResponse createListing(ListingRequest request, Long ownerId) {

        Listing listing = new Listing();
        listing.setTitle(request.title);
        listing.setDescription(request.description);
        listing.setPrice((double) request.price);
        listing.setLocation(request.location);
        listing.setAmenities(request.amenities);
        listing.setOwnerId(ownerId);
        listing.setOwnerName(request.ownerName);

        Listing saved = repository.save(listing);

        // 🔥 SEND TO AI
        try {
            String text = saved.getTitle() + ", " +
                    saved.getDescription() + ", " +
                    saved.getLocation() + ", " +
                    saved.getAmenities();

            Map<String, String> body = Map.of(
                    "id", saved.getId().toString(),
                    "text", text
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> entity =
                    new HttpEntity<>(body, headers);

            restTemplate.postForEntity(
                    "http://ai-service:8000/add",
                    entity,
                    String.class
            );
            log.info("✅ Sent to AI successfully");

        } catch (Exception e) {
            log.error("❌ AI sync failed: {}", e.getMessage());
        }

        return mapToResponse(saved);
    }

    public Page<ListingResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return repository.findAll(pageable)
                .map(this::mapToResponse);
    }

    public ListingResponse getOne(Long id) {
        Listing listing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        return mapToResponse(listing);
    }

    public ListingResponse verify(Long id) {
        Listing listing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        listing.setVerified(true);

        return mapToResponse(repository.save(listing));
    }

    private ListingResponse mapToResponse(Listing l) {
        ListingResponse r = new ListingResponse();

        r.id = l.getId();
        r.title = l.getTitle();
        r.description = l.getDescription();
        r.price = l.getPrice();
        r.location = l.getLocation();
        r.amenities = l.getAmenities();
        r.isVerified = l.isVerified();
        r.ownerName = l.getOwnerName();

        return r;
    }

    public List<ListingResponse> search(String location, Double maxPrice, boolean verified) {

        log.info("Searching listings: location={}, price={}, verified={}",
                location, maxPrice, verified);

        return repository
                .findByLocationContainingIgnoreCaseAndPriceLessThanEqualAndIsVerified(
                        location, maxPrice, verified)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}