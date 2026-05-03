package com.Ai4EveryOne.Livyfy.chatbot.dto;
import java.util.*;

import lombok.Data;

@Data
public class DebateResponse {
    private Map<Long, Double> votes;
    private Map<String, Map<Long, String>> reasoning;
}