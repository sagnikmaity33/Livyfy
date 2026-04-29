package com.Ai4EveryOne.Livyfy.listing.repository;



import com.Ai4EveryOne.Livyfy.listing.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findByLocationContainingIgnoreCaseAndPriceLessThanEqualAndIsVerified(
            String location,
            Double price,
            boolean isVerified
    );
}