package com.healthcare.ai_healthcare.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AiSymptomRequest {

    @NotBlank(message = "증상을 입력해주세요.")
    private String symptom;
}