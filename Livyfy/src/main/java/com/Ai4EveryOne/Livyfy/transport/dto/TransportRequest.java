package com.Ai4EveryOne.Livyfy.transport.dto;

import lombok.Data;

@Data
public class TransportRequest {
    private Double workLat;
    private Double workLng;
    private Integer maxDurationMinutes; // optional filter
}