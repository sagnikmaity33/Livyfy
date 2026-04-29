package com.Ai4EveryOne.Livyfy.booking.controller;

import com.Ai4EveryOne.Livyfy.booking.dto.CreateBookingRequest;
import com.Ai4EveryOne.Livyfy.booking.dto.UpdateBookingStatusRequest;
import com.Ai4EveryOne.Livyfy.booking.dto.BookingResponse;
import com.Ai4EveryOne.Livyfy.booking.service.BookingService;
import com.Ai4EveryOne.Livyfy.common.ApiResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // 1. Create Booking
    @PostMapping
    public ApiResponse<BookingResponse> createBooking(
            @RequestBody CreateBookingRequest request
    ) {
        Long userId = 1L; // TEMP (replace with JWT later)

        BookingResponse response = bookingService.createBooking(request, userId);

        return ApiResponse.success("Booking created", response);
    }

    // 2. Owner updates status
    @PatchMapping("/{id}/status")
    public ApiResponse<BookingResponse> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody UpdateBookingStatusRequest request
    ) {
        Long ownerId = 2L; // TEMP

        BookingResponse response =
                bookingService.updateStatus(id, request.getStatus(), ownerId);

        return ApiResponse.success("Booking updated", response);
    }

    // 3. Get user bookings
    @GetMapping("/user")
    public ApiResponse<List<BookingResponse>> getUserBookings() {
        Long userId = 1L;

        return ApiResponse.success(
                "User bookings",
                bookingService.getUserBookings(userId)
        );
    }

    // 4. Get owner bookings
    @GetMapping("/owner")
    public ApiResponse<List<BookingResponse>> getOwnerBookings() {
        Long ownerId = 2L;

        return ApiResponse.success(
                "Owner bookings",
                bookingService.getOwnerBookings(ownerId)
        );
    }
}