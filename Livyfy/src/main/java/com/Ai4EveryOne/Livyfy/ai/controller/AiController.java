package com.Ai4EveryOne.Livyfy.ai.controller;

import com.Ai4EveryOne.Livyfy.ai.dto.AiRequest;
import com.Ai4EveryOne.Livyfy.ai.service.AiService;
import com.Ai4EveryOne.Livyfy.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    private final AiService service;

    public AiController(AiService service) {
        this.service = service;
    }

    @PostMapping("/query")
    public ApiResponse<String> query(@RequestBody AiRequest request) {

        String answer = service.askAI(request.query);

        return new ApiResponse<>(true, "AI response", answer);
    }

    @GetMapping("/test")
    public String test() {
        return "AI controller working";
    }
}