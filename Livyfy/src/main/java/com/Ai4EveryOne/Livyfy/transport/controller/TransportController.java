package com.Ai4EveryOne.Livyfy.transport.controller;



import com.Ai4EveryOne.Livyfy.common.ApiResponse;
import com.Ai4EveryOne.Livyfy.transport.dto.TransportRequest;
import com.Ai4EveryOne.Livyfy.transport.dto.TransportResponse;

import com.Ai4EveryOne.Livyfy.transport.service.TransportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transport")
@RequiredArgsConstructor
public class TransportController {

    private final TransportService transportService;

    @PostMapping("/commute")
    public ApiResponse<List<TransportResponse>> getCommute(
            @RequestBody TransportRequest request
    ) {
        return ApiResponse.success(
                "Commute options fetched",
                transportService.getCommuteOptions(request)
        );
    }
}