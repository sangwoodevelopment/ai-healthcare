package com.healthcare.ai_healthcare.hospital.dto;

import com.healthcare.ai_healthcare.hospital.entity.Hospital;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HospitalResponse {

    private Long id;
    private String name;
    private String address;
    private String phoneNumber;
    private String department;
    private String sido;
    private String sigungu;

    public static HospitalResponse from(Hospital hospital) {
        return HospitalResponse.builder()
                .id(hospital.getId())
                .name(hospital.getName())
                .address(hospital.getAddress())
                .phoneNumber(hospital.getPhoneNumber())
                .department(hospital.getDepartment())
                .sido(hospital.getSido())
                .sigungu(hospital.getSigungu())
                .build();
    }
}