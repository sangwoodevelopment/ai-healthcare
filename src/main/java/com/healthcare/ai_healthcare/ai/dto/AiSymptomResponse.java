package com.healthcare.ai_healthcare.ai.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AiSymptomResponse {

    private String recommendedDepartment;
    private String reason;
}