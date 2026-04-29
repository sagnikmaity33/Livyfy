package com.Ai4EveryOne.Livyfy.booking.dto;
import com.Ai4EveryOne.Livyfy.booking.model.BookingStatus;

public class UpdateBookingStatusRequest {

    private BookingStatus status;

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}