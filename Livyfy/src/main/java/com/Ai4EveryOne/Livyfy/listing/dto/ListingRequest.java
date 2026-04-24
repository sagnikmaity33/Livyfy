package com.Ai4EveryOne.Livyfy.listing.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ListingRequest {

    @NotBlank(message = "Title is required")
    public String title;

    public String description;

    @Min(value = 1000, message = "Price must be at least 1000")
    public int price;

    @NotBlank(message = "Location is required")
    public String location;

    public String amenities;

    @NotBlank(message = "Owner name is required")
    public String ownerName;
}