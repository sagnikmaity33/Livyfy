package com.Ai4EveryOne.Livyfy.chatbot.dto;


import lombok.Data;

@Data
public class ChatRequest {
    private String message;
    private String previousContext;
}