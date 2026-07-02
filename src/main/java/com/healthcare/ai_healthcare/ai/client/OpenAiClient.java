package com.healthcare.ai_healthcare.ai.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class OpenAiClient {

    @Value("${openai.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String analyzeSymptom(String symptom) {
        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of(
                                "role", "system",
                                "content", "너는 의료 진단을 하지 않는다. 사용자의 증상을 보고 적절한 진료과 하나와 이유를 한국어 JSON으로만 반환해라. 형식: {\"recommendedDepartment\":\"\",\"reason\":\"\"}"
                        ),
                        Map.of(
                                "role", "user",
                                "content", symptom
                        )
                ),
                "temperature", 0.2
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        Map choices = (Map) ((List<?>) response.getBody().get("choices")).get(0);
        Map message = (Map) choices.get("message");

        return (String) message.get("content");
    }
}