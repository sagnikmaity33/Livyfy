package com.Ai4EveryOne.Livyfy.listing.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ListingResponse {
    public Long id;


    public String title;
    public String description;


    public int price;
    public String location;
    public String amenities;
    public boolean isVerified;
    public String ownerName;
}