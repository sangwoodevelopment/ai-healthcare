package com.healthcare.ai_healthcare.user.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class DashboardResponse {
    private int favoriteCount;
    private int aiHistoryCount;
    private List<DepartmentStatResponse> departmentStats;
}