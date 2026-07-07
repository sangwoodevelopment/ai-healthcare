package com.healthcare.ai_healthcare.user.controller;

import com.healthcare.ai_healthcare.common.response.ApiResponse;
import com.healthcare.ai_healthcare.user.dto.DashboardResponse;
import com.healthcare.ai_healthcare.user.dto.MyPageResponse;
import com.healthcare.ai_healthcare.user.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<MyPageResponse> getMyPage() {
        return ApiResponse.success("내 정보 조회 성공", userService.getMyPage());
    }
    @GetMapping("/dashboard")
    public ApiResponse<DashboardResponse> getDashboard() {
        return ApiResponse.success("대시보드 조회 성공", userService.getDashboard());
    }
}