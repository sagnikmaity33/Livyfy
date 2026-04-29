package com.Ai4EveryOne.Livyfy.booking.dto;
import lombok.Data;

import java.time.LocalDate;


@Data
public class CreateBookingRequest {
    private Long listingId;
    private String message;
    private String contactPhone;
    private String contactEmail;
    private LocalDate moveInDate;
}