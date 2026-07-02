package com.healthcare.ai_healthcare.ai.dto;

import com.healthcare.ai_healthcare.hospital.dto.HospitalResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class AiSymptomResponse {

    private String recommendedDepartment;

    private String reason;

    private List<HospitalResponse> hospitals;
}