package com.healthcare.ai_healthcare.hospital.service;

import com.healthcare.ai_healthcare.exception.BusinessException;
import com.healthcare.ai_healthcare.exception.ErrorCode;
import com.healthcare.ai_healthcare.hospital.dto.HiraHospitalResponse;
import com.healthcare.ai_healthcare.hospital.dto.HospitalResponse;
import com.healthcare.ai_healthcare.hospital.entity.Hospital;
import com.healthcare.ai_healthcare.hospital.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public Page<HospitalResponse> getHospitals(String keyword,Pageable pageable) {
        if (keyword != null && !keyword.isBlank()) {
            return hospitalRepository
                    .findByNameContainingOrAddressContainingOrDepartmentContaining(
                            keyword,
                            keyword,
                            keyword,
                            pageable
                    )
                    .map(HospitalResponse::from);
        }

        return hospitalRepository.findAll(pageable)
                .map(HospitalResponse::from);
    }

    @Transactional
    public void saveHospitals(HiraHospitalResponse response) {

        for (HiraHospitalResponse.Item item : response.getResponse()
                .getBody()
                .getItems()
                .getItem()) {

            if (hospitalRepository.existsByYkiho(item.getYkiho())) {
                continue;
            }

            Hospital hospital = Hospital.builder()
                    .ykiho(item.getYkiho())
                    .name(item.getName())
                    .address(item.getAddress())
                    .phoneNumber(item.getPhoneNumber())
                    .department(item.getDepartment())
                    .sido(item.getSido())
                    .sigungu(item.getSigungu())
                    .build();

            hospitalRepository.save(hospital);
        }
    }

    public HospitalResponse getHospital(Long id){
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.HOSPITAL_NOT_FOUND));

        return HospitalResponse.from(hospital);
    }
}