package com.Ai4EveryOne.Livyfy.auth.repository;

import com.Ai4EveryOne.Livyfy.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}