package com.Ai4EveryOne.Livyfy.booking.service;

import com.Ai4EveryOne.Livyfy.booking.dto.BookingResponse;
import com.Ai4EveryOne.Livyfy.booking.dto.CreateBookingRequest;
import com.Ai4EveryOne.Livyfy.booking.model.BookingStatus;

import java.util.List;

public interface BookingService {

    BookingResponse createBooking(CreateBookingRequest request, Long userId);

    BookingResponse updateStatus(Long bookingId, BookingStatus status, Long ownerId);

    List<BookingResponse> getUserBookings(Long userId);

    List<BookingResponse> getOwnerBookings(Long ownerId);
}