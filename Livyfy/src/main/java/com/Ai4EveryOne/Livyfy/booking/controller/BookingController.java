package com.Ai4EveryOne.Livyfy.booking.controller;

import com.Ai4EveryOne.Livyfy.auth.model.Role;
import com.Ai4EveryOne.Livyfy.auth.model.User;
import com.Ai4EveryOne.Livyfy.booking.dto.CreateBookingRequest;
import com.Ai4EveryOne.Livyfy.booking.dto.UpdateBookingStatusRequest;
import com.Ai4EveryOne.Livyfy.booking.dto.BookingResponse;
import com.Ai4EveryOne.Livyfy.booking.service.BookingService;
import com.Ai4EveryOne.Livyfy.common.ApiResponse;

import com.Ai4EveryOne.Livyfy.common.utils.AuthHelper;
import com.Ai4EveryOne.Livyfy.listing.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final AuthHelper authHelper;
    private final ListingRepository listingRepository;

    // 1. Create Booking
    @PostMapping
    public ApiResponse<BookingResponse> createBooking(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateBookingRequest request
    ) {
        User user = authHelper.getUserFromToken(token);

        if (user.getRole() != Role.USER) {
            throw new RuntimeException("Only users can create bookings");
        }

        return ApiResponse.success(
                "Booking created",
                bookingService.createBooking(request, user.getId())
        );
    }

    // 2. Owner updates status
    @PatchMapping("/{id}/status")
    public ApiResponse<BookingResponse> updateBookingStatus(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody UpdateBookingStatusRequest request
    ) {
        User user = authHelper.getUserFromToken(token);

        if (user.getRole() != Role.OWNER) {
            throw new RuntimeException("Only owners can update bookings");
        }

        return ApiResponse.success(
                "Booking updated",
                bookingService.updateStatus(id, request.getStatus(), user.getId())
        );
    }

    // 3. Get user bookings
    @GetMapping("/user")
    public ApiResponse<List<BookingResponse>> getUserBookings(
            @RequestHeader("Authorization") String token
    ) {
        User user = authHelper.getUserFromToken(token);

        if (user.getRole() != Role.USER) {
            throw new RuntimeException("Access denied");
        }

        return ApiResponse.success(
                "User bookings",
                bookingService.getUserBookings(user.getId())
        );
    }

    // 4. Get owner bookings
    @GetMapping("/owner")
    public ApiResponse<List<BookingResponse>> getOwnerBookings(
            @RequestHeader("Authorization") String token
    ) {
        User user = authHelper.getUserFromToken(token);

        if (user.getRole() != Role.OWNER) {
            throw new RuntimeException("Access denied");
        }

        return ApiResponse.success(
                "Owner bookings",
                bookingService.getOwnerBookings(user.getId())
        );
    }
}