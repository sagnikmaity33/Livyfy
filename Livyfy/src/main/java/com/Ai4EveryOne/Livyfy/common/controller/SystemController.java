package com.Ai4EveryOne.Livyfy.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;

@RestController
public class SystemController {

    @GetMapping("/instance")
    public Map<String, String> getInstanceInfo() {
        Map<String, String> response = new HashMap<>();
        try {
            String hostname = InetAddress.getLocalHost().getHostName();
            response.put("servedBy", hostname);
            response.put("status", "running");
        } catch (Exception e) {
            response.put("servedBy", "unknown");
        }
        return response;
    }
}
