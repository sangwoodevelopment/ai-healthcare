package com.healthcare.ai_healthcare.hospital.repository;

import com.healthcare.ai_healthcare.hospital.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    List<Hospital> findByNameContainingOrAddressContainingOrDepartmentContaining(
            String name,
            String address,
            String department
    );

    boolean existsByYkiho(String ykiho);

    Optional<Hospital> findByYkiho(String ykiho);
}