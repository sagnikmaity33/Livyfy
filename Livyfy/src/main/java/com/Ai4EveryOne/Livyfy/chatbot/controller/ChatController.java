package com.Ai4EveryOne.Livyfy.chatbot.controller;


import com.Ai4EveryOne.Livyfy.chatbot.dto.ChatRequest;
import com.Ai4EveryOne.Livyfy.chatbot.service.ChatService;
import com.Ai4EveryOne.Livyfy.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ApiResponse<String> chat(@RequestBody ChatRequest request) {
        return new ApiResponse<>(true, "Chat response",
                chatService.handleMessage(request));
    }
}