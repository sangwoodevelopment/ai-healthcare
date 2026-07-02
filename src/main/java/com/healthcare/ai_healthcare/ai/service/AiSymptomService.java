package com.healthcare.ai_healthcare.ai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcare.ai_healthcare.ai.client.OpenAiClient;
import com.healthcare.ai_healthcare.ai.dto.AiSymptomRequest;
import com.healthcare.ai_healthcare.ai.dto.AiSymptomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiSymptomService {

    private final OpenAiClient openAiClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AiSymptomResponse analyzeSymptom(AiSymptomRequest request) {
        try {
            String content = openAiClient.analyzeSymptom(request.getSymptom());

            return objectMapper.readValue(content, AiSymptomResponse.class);

        } catch (Exception e) {
            return AiSymptomResponse.builder()
                    .recommendedDepartment("내과")
                    .reason("AI 분석 중 오류가 발생하여 기본 진료과인 내과 방문을 권장합니다.")
                    .build();
        }
    }
}