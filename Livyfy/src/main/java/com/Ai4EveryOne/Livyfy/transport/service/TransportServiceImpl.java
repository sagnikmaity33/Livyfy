package com.Ai4EveryOne.Livyfy.transport.service;

import com.Ai4EveryOne.Livyfy.transport.dto.TransportRequest;
import com.Ai4EveryOne.Livyfy.transport.dto.TransportResponse;
import com.Ai4EveryOne.Livyfy.listing.model.Listing;
import com.Ai4EveryOne.Livyfy.listing.repository.ListingRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TransportServiceImpl implements TransportService {

    private final RestTemplate restTemplate;
    private final ListingRepository listingRepository;

    @Override
    public List<TransportResponse> getCommuteOptions(TransportRequest request) {

        List<Listing> listings = listingRepository.findAll();

        List<TransportResponse> result = new ArrayList<>();

        for (Listing listing : listings) {

            if (listing.getLatitude() == null) continue;

            String url = String.format(
                    "http://router.project-osrm.org/route/v1/driving/%f,%f;%f,%f?overview=false",
                    listing.getLongitude(),
                    listing.getLatitude(),
                    request.getWorkLng(),
                    request.getWorkLat()
            );

            Map response = restTemplate.getForObject(url, Map.class);

            List routes = (List) response.get("routes");
            if (routes == null || routes.isEmpty()) continue;

            Map route = (Map) routes.get(0);

            double distance = (double) route.get("distance") / 1000.0;
            double duration = (double) route.get("duration") / 60.0;

            TransportResponse res = new TransportResponse();
            res.setListingId(listing.getId());
            res.setDistanceKm(distance);
            res.setDurationMinutes(duration);

            result.add(res);
        }

        return result;
    }
}