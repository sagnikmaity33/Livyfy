package com.Ai4EveryOne.Livyfy.booking.service;



import com.Ai4EveryOne.Livyfy.booking.dto.CreateBookingRequest;
import com.Ai4EveryOne.Livyfy.booking.dto.BookingResponse;
import com.Ai4EveryOne.Livyfy.booking.model.Booking;
import com.Ai4EveryOne.Livyfy.booking.model.BookingStatus;
import com.Ai4EveryOne.Livyfy.booking.repository.BookingRepository;

import com.Ai4EveryOne.Livyfy.listing.model.Listing;
import com.Ai4EveryOne.Livyfy.listing.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ListingRepository listingRepository;

    // 🔹 CREATE BOOKING
    @Override
    public BookingResponse createBooking(CreateBookingRequest request, Long userId) {

        Booking booking = new Booking();

        booking.setListingId(request.getListingId());
        booking.setUserId(userId);

        //  FETCH LISTING
        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        if (!listing.isVerified()) {
            throw new RuntimeException("Listing not verified");
        }

        // 🔥 REAL OWNER LINK
        booking.setOwnerId(listing.getOwnerId());

        booking.setStatus(BookingStatus.PENDING);
        booking.setMessage(request.getMessage());
        booking.setContactEmail(request.getContactEmail());
        booking.setContactPhone(request.getContactPhone());
        booking.setMoveInDate(request.getMoveInDate());
        booking.setCreatedAt(LocalDateTime.now());

        return mapToResponse(bookingRepository.save(booking));
    }
    // 🔹 UPDATE STATUS
    @Override
    public BookingResponse updateStatus(Long bookingId, BookingStatus status, Long ownerId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // OWNER CHECK
        if (!booking.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You are not the owner of this listing");
        }

        // ONLY PENDING CAN CHANGE
        if (!booking.getStatus().equals(BookingStatus.PENDING)) {
            throw new RuntimeException("Booking already processed");
        }

        booking.setStatus(status);

        Booking updated = bookingRepository.save(booking);

        return mapToResponse(updated);
    }

    // 🔹 USER BOOKINGS
    @Override
    public List<BookingResponse> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 🔹 OWNER BOOKINGS
    @Override
    public List<BookingResponse> getOwnerBookings(Long ownerId) {
        return bookingRepository.findByOwnerId(ownerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 🔹 MAPPER (KEEP SIMPLE)
    private BookingResponse mapToResponse(Booking booking) {

        BookingResponse res = new BookingResponse();

        res.setId(booking.getId());
        res.setListingId(booking.getListingId());
        res.setUserId(booking.getUserId());
        res.setStatus(booking.getStatus());
        res.setMoveInDate(booking.getMoveInDate());
        res.setMessage(booking.getMessage());

        return res;
    }
}