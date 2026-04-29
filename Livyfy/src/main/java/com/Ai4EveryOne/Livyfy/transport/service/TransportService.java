package com.Ai4EveryOne.Livyfy.transport.service;

import com.Ai4EveryOne.Livyfy.transport.dto.TransportRequest;
import com.Ai4EveryOne.Livyfy.transport.dto.TransportResponse;

import java.util.List;

public interface TransportService {
    List<TransportResponse> getCommuteOptions(TransportRequest request);
}