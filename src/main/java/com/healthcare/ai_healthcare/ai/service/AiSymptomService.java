package com.healthcare.ai_healthcare.ai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcare.ai_healthcare.ai.client.OpenAiClient;
import com.healthcare.ai_healthcare.ai.dto.AiSymptomRequest;
import com.healthcare.ai_healthcare.ai.dto.AiSymptomResponse;
import com.healthcare.ai_healthcare.history.service.AiHistoryService;
import com.healthcare.ai_healthcare.hospital.dto.HospitalResponse;
import com.healthcare.ai_healthcare.hospital.service.HospitalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiSymptomService {

    private final OpenAiClient openAiClient;
    private final HospitalService hospitalService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final AiHistoryService aiHistoryService;

    public AiSymptomResponse analyzeSymptom(AiSymptomRequest request) {
        log.info("AI 증상 분석 요청: {}", request.getSymptom());

        try {
            String content = openAiClient.analyzeSymptom(request.getSymptom());
            log.info("OpenAI 응답: {}", content);

            AiSymptomResponse aiResponse =
                    objectMapper.readValue(content, AiSymptomResponse.class);

            List<HospitalResponse> hospitals =
                    hospitalService.getRecommendedHospitals(
                            aiResponse.getRecommendedDepartment()
                    );

            AiSymptomResponse result = AiSymptomResponse.builder()
                    .recommendedDepartment(aiResponse.getRecommendedDepartment())
                    .reason(aiResponse.getReason())
                    .hospitals(hospitals)
                    .build();

            aiHistoryService.saveHistory(
                    request.getSymptom(),
                    result.getRecommendedDepartment(),
                    result.getReason()
            );

            return result;

        } catch (Exception e) {
            log.error("AI 증상 분석 중 오류 발생", e);

            List<HospitalResponse> hospitals =
                    hospitalService.getRecommendedHospitals("종합병원");

            AiSymptomResponse result = AiSymptomResponse.builder()
                    .recommendedDepartment("종합병원")
                    .reason("AI 분석 중 오류가 발생하여 종합병원 방문을 권장합니다.")
                    .hospitals(hospitals)
                    .build();

            aiHistoryService.saveHistory(
                    request.getSymptom(),
                    result.getRecommendedDepartment(),
                    result.getReason()
            );

            return result;
        }
    }
}