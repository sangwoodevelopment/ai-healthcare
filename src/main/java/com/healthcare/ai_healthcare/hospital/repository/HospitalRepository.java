package com.healthcare.ai_healthcare.hospital.repository;

import com.healthcare.ai_healthcare.hospital.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    List<Hospital> findByNameContaining(String keyword);

    List<Hospital> findByDepartmentContaining(String department);

    List<Hospital> findBySidoAndSigungu(String sido, String sigungu);
}