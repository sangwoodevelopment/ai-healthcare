package com.healthcare.ai_healthcare.hospital.service;

import com.healthcare.ai_healthcare.exception.BusinessException;
import com.healthcare.ai_healthcare.exception.ErrorCode;
import com.healthcare.ai_healthcare.hospital.client.HiraHospitalClient;
import com.healthcare.ai_healthcare.hospital.dto.HiraHospitalResponse;
import com.healthcare.ai_healthcare.hospital.dto.HospitalResponse;
import com.healthcare.ai_healthcare.hospital.entity.Hospital;
import com.healthcare.ai_healthcare.hospital.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HospitalService {

    private final HospitalRepository hospitalRepository;
    private final HiraHospitalClient hiraHospitalClient;

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
    public int saveHospitals(HiraHospitalResponse response) {
        List<HiraHospitalResponse.Item> items = response.getResponse()
                .getBody()
                .getItems()
                .getItem();

        List<String> ykihos = items.stream()
                .map(HiraHospitalResponse.Item::getYkiho)
                .toList();

        List<String> existingYkihos = hospitalRepository.findByYkihoIn(ykihos)
                .stream()
                .map(Hospital::getYkiho)
                .toList();

        List<Hospital> hospitals = items.stream()
                .filter(item -> !existingYkihos.contains(item.getYkiho()))
                .map(item -> Hospital.builder()
                        .ykiho(item.getYkiho())
                        .name(item.getName())
                        .address(item.getAddress())
                        .phoneNumber(item.getPhoneNumber())
                        .department(item.getDepartment())
                        .sido(item.getSido())
                        .sigungu(item.getSigungu())
                        .build())
                .toList();

        hospitalRepository.saveAll(hospitals);

        return hospitals.size();
    }

    public HospitalResponse getHospital(Long id){
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.HOSPITAL_NOT_FOUND));

        return HospitalResponse.from(hospital);
    }

    @Transactional
    public int syncAllHospitals() {
        int pageNo = 1;
        int numOfRows = 100;
        int savedCount = 0;

        HiraHospitalResponse firstResponse =
                hiraHospitalClient.getHospitalList(pageNo, numOfRows);

        int totalCount = firstResponse.getResponse().getBody().getTotalCount();
        int totalPages = (int) Math.ceil((double) totalCount / numOfRows);
        totalPages = Math.min(totalPages, 3);

        savedCount += saveHospitals(firstResponse);

        for (int page = 2; page <= totalPages; page++) {
            HiraHospitalResponse response =
                    hiraHospitalClient.getHospitalList(page, numOfRows);

            savedCount += saveHospitals(response);
        }

        return savedCount;
    }

    public HiraHospitalResponse getHiraHospitalTest() {
        return hiraHospitalClient.getHospitalList(1, 10);
    }
}