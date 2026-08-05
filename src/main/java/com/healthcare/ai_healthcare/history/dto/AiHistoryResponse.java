package com.healthcare.ai_healthcare.history.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiHistoryResponse {

    private Long id;

    private String symptom;

    private String recommendedDepartment;

    private String reason;

    private LocalDateTime createdAt;

}