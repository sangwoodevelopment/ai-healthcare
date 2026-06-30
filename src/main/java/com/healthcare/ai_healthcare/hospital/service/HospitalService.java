package com.healthcare.ai_healthcare.hospital.service;

import com.healthcare.ai_healthcare.hospital.dto.HospitalResponse;
import com.healthcare.ai_healthcare.hospital.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public List<HospitalResponse> getHospitals(String keyword, String department) {
        if (keyword != null && !keyword.isBlank()) {
            return hospitalRepository.findByNameContaining(keyword)
                    .stream()
                    .map(HospitalResponse::from)
                    .toList();
        }

        if (department != null && !department.isBlank()) {
            return hospitalRepository.findByDepartmentContaining(department)
                    .stream()
                    .map(HospitalResponse::from)
                    .toList();
        }

        return hospitalRepository.findAll()
                .stream()
                .map(HospitalResponse::from)
                .toList();
    }
}