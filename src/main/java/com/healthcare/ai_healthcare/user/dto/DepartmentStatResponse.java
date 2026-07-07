package com.healthcare.ai_healthcare.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepartmentStatResponse {
    private String department;
    private long count;
}