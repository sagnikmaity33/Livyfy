package com.Ai4EveryOne.Livyfy.transport.dto;

import lombok.Data;

@Data
public class TransportResponse {
    private Long listingId;
    private Double distanceKm;
    private Double durationMinutes;
}