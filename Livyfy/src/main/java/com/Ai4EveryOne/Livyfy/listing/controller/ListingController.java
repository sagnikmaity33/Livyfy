package com.Ai4EveryOne.Livyfy.listing.controller;



import com.Ai4EveryOne.Livyfy.auth.model.Role;
import com.Ai4EveryOne.Livyfy.auth.model.User;
import com.Ai4EveryOne.Livyfy.common.ApiResponse;
import com.Ai4EveryOne.Livyfy.common.utils.AuthHelper;
import com.Ai4EveryOne.Livyfy.listing.dto.ListingRequest;
import com.Ai4EveryOne.Livyfy.listing.dto.ListingResponse;
import com.Ai4EveryOne.Livyfy.listing.model.Listing;
import com.Ai4EveryOne.Livyfy.listing.service.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@RestController

@RequestMapping("/api/v1/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService service;
    private final AuthHelper authHelper;

//    public ListingController(ListingService service, AuthHelper authHelper) {
//        this.service = service;
//        this.authHelper = authHelper;
//    }

    @PostMapping
    public ApiResponse<ListingResponse> create(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody ListingRequest request
    ) {
        User user = authHelper.getUserFromToken(token);

        if (user.getRole() != Role.OWNER) {
            throw new RuntimeException("Only owners can create listings");
        }

        return new ApiResponse<>(
                true,
                "Listing created",
                service.createListing(request, user.getId())
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