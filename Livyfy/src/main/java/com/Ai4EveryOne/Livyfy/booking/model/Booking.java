package com.Ai4EveryOne.Livyfy.booking.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long listingId;

    private Long userId;   // renter
    private Long ownerId;  // listing owner

    @Enumerated(EnumType.STRING)
    private BookingStatus status; // PENDING, ACCEPTED, REJECTED

    private String message; // user note

    private String contactPhone;
    private String contactEmail;

    private LocalDate moveInDate;

    private LocalDateTime createdAt;
}