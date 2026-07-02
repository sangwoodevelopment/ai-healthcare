package com.healthcare.ai_healthcare.ai.controller;

import com.healthcare.ai_healthcare.ai.dto.AiSymptomRequest;
import com.healthcare.ai_healthcare.ai.dto.AiSymptomResponse;
import com.healthcare.ai_healthcare.ai.service.AiSymptomService;
import com.healthcare.ai_healthcare.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "AI", description = "AI 증상 분석 API")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiSymptomController {

    private final AiSymptomService aiSymptomService;

    @Operation(summary = "증상 분석", description = "입력한 증상을 기반으로 추천 진료과를 반환합니다.")
    @PostMapping("/symptom")
    public ApiResponse<AiSymptomResponse> analyzeSymptom(
            @Valid @RequestBody AiSymptomRequest request
    ) {
        AiSymptomResponse response = aiSymptomService.analyzeSymptom(request);

        return ApiResponse.success("증상 분석 성공", response);
    }
}