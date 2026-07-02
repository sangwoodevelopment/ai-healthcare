package com.healthcare.ai_healthcare.hospital.repository;

import com.healthcare.ai_healthcare.hospital.entity.Hospital;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    Page<Hospital> findByNameContainingOrAddressContainingOrDepartmentContaining(
            String name,
            String address,
            String department,
            Pageable pageable
    );
    Page<Hospital> findByDepartmentContaining(
            String department,
            Pageable pageable
    );

    boolean existsByYkiho(String ykiho);

    Optional<Hospital> findByYkiho(String ykiho);
    Optional<Hospital> findById(Long id);
    List<Hospital> findByYkihoIn(List<String> ykihos);
}