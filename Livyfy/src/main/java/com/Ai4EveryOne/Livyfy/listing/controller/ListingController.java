package com.Ai4EveryOne.Livyfy.listing.controller;



import com.Ai4EveryOne.Livyfy.common.ApiResponse;
import com.Ai4EveryOne.Livyfy.listing.dto.ListingRequest;
import com.Ai4EveryOne.Livyfy.listing.dto.ListingResponse;
import com.Ai4EveryOne.Livyfy.listing.model.Listing;
import com.Ai4EveryOne.Livyfy.listing.service.ListingService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@RestController
@RequestMapping("/api/v1/listings")
public class ListingController {

    private final ListingService service;

    public ListingController(ListingService service) {
        this.service = service;
    }

    @PostMapping
    public ApiResponse<ListingResponse> create(
            @Valid @RequestBody ListingRequest request
    ) {
        return new ApiResponse<>(
                true,
                "Listing created",
                service.createListing(request)
        );
    }

    @GetMapping
    public ApiResponse<Page<ListingResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return new ApiResponse<>(
                true,
                "Listings fetched",
                service.getAll(page, size)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<ListingResponse> getOne(@PathVariable Long id) {
        return new ApiResponse<>(
                true,
                "Listing fetched",
                service.getOne(id)
        );
    }



    @GetMapping("/search")
    public ApiResponse<List<ListingResponse>> search(
            @RequestParam String location,
            @RequestParam Double maxPrice,
            @RequestParam(defaultValue = "true") boolean verified
    ) {
        return new ApiResponse<>(
                true,
                "Search results",
                service.search(location, maxPrice, verified)
        );
    }

    @PatchMapping("/{id}/verify")
    public ApiResponse<ListingResponse> verify(
            @PathVariable Long id,
            @RequestParam String adminKey
    ) {

        if (!adminKey.equals("secret123")) {
            throw new RuntimeException("Unauthorized");
        }

        return new ApiResponse<>(
                true,
                "Listing verified",
                service.verify(id)
        );
    }

}