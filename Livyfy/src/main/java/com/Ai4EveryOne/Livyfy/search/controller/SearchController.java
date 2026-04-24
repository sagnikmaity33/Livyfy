package com.Ai4EveryOne.Livyfy.search.controller;

import com.Ai4EveryOne.Livyfy.common.ApiResponse;
import com.Ai4EveryOne.Livyfy.search.dto.HybridSearchRequest;
import com.Ai4EveryOne.Livyfy.search.service.SearchService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    private final SearchService service;

    public SearchController(SearchService service) {
        this.service = service;
    }

    @PostMapping("/hybrid")
    public ApiResponse<?> hybridSearch(@RequestBody HybridSearchRequest request) {
        return new ApiResponse<>(
                true,
                "Hybrid results",
                service.hybridSearch(request)
        );
    }
}