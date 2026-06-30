package com.healthcare.ai_healthcare.hospital.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "hospitals")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 병원명
    @Column(nullable = false, length = 100)
    private String name;

    // 주소
    @Column(nullable = false, length = 255)
    private String address;

    // 전화번호
    @Column(length = 30)
    private String phoneNumber;

    // 진료과
    @Column(length = 50)
    private String department;

    // 시/도
    @Column(length = 50)
    private String sido;

    // 시/군/구
    @Column(length = 50)
    private String sigungu;

    @Builder
    public Hospital(
            String name,
            String address,
            String phoneNumber,
            String department,
            String sido,
            String sigungu
    ) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.sido = sido;
        this.sigungu = sigungu;
    }
}