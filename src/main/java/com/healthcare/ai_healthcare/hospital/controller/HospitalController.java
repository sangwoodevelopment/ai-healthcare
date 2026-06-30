package com.healthcare.ai_healthcare.hospital.controller;

import com.healthcare.ai_healthcare.common.response.ApiResponse;
import com.healthcare.ai_healthcare.hospital.client.HiraHospitalClient;
import com.healthcare.ai_healthcare.hospital.dto.HospitalResponse;
import com.healthcare.ai_healthcare.hospital.service.HospitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Hospital", description = "병원 API")
@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService hospitalService;
    private final HiraHospitalClient hiraHospitalClient;

    @Operation(summary = "병원 목록 조회", description = "병원 목록을 조회합니다. keyword 또는 department 조건으로 검색할 수 있습니다.")
    @GetMapping
    public ApiResponse<List<HospitalResponse>> getHospitals(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String department
    ) {
        List<HospitalResponse> response = hospitalService.getHospitals(keyword, department);

        return ApiResponse.success("병원 목록 조회 성공", response);
    }

    @Operation(summary = "HIRA 병원 API 테스트", description = "HIRA 병원정보서비스 응답을 원문 문자열로 확인합니다.")
    @GetMapping("/hira/test")
    public ApiResponse<String> testHiraApi() {
        String response = hiraHospitalClient.getHospitalList(1, 10);
        return ApiResponse.success("HIRA API 호출 성공", response);
    }
}