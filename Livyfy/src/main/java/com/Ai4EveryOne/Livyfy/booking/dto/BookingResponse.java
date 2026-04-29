package com.Ai4EveryOne.Livyfy.booking.dto;

import com.Ai4EveryOne.Livyfy.booking.model.BookingStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingResponse {
    private Long id;
    private Long listingId;
    private Long userId;
    private BookingStatus status;
    private LocalDate moveInDate;
    private String message;
}