package com.Ai4EveryOne.Livyfy.booking.repository;

import com.Ai4EveryOne.Livyfy.booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByOwnerId(Long ownerId);
}