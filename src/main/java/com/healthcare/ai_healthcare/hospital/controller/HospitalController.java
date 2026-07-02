package com.healthcare.ai_healthcare.hospital.controller;

import com.healthcare.ai_healthcare.common.response.ApiResponse;
import com.healthcare.ai_healthcare.hospital.client.HiraHospitalClient;
import com.healthcare.ai_healthcare.hospital.dto.HiraHospitalResponse;
import com.healthcare.ai_healthcare.hospital.dto.HospitalResponse;
import com.healthcare.ai_healthcare.hospital.service.HospitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Hospital", description = "병원 API")
@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService hospitalService;
    private final HiraHospitalClient hiraHospitalClient;

    @Operation(summary = "병원 목록 조회", description = "병원명, 주소, 진료과 키워드로 병원을 검색합니다.")
    @GetMapping
    public ApiResponse<Page<HospitalResponse>> getHospitals(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<HospitalResponse> response = hospitalService.getHospitals(keyword,pageable);

        return ApiResponse.success("병원 목록 조회 성공", response);
    }

    @Operation(summary = "HIRA 병원 API 테스트", description = "HIRA 병원정보서비스 응답을 확인합니다.")
    @GetMapping("/hira/test")
    public ApiResponse<HiraHospitalResponse> testHiraApi() {
        HiraHospitalResponse response = hiraHospitalClient.getHospitalList(1, 10);
        return ApiResponse.success("HIRA API 호출 성공", response);
    }

    @Operation(summary = "HIRA 병원 데이터 전체 동기화")
    @PostMapping("/sync")
    public ApiResponse<Integer> syncHospitals() {
        int savedCount = hospitalService.syncAllHospitals();

        return ApiResponse.success("병원 동기화 완료",savedCount);
    }

    @Operation(summary = "병원 상세 조회")
    @GetMapping("/{id}")
    public ApiResponse<HospitalResponse> getHospital(
            @PathVariable Long id
    ){
        return ApiResponse.success(
                "병원 조회 성공",
                hospitalService.getHospital(id)
        );
    }
}