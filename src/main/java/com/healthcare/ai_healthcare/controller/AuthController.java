package com.healthcare.ai_healthcare.controller;

import com.healthcare.ai_healthcare.dto.SignupRequest;
import com.healthcare.ai_healthcare.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.healthcare.ai_healthcare.dto.LoginRequest;
import com.healthcare.ai_healthcare.dto.LoginResponse;
import com.healthcare.ai_healthcare.common.response.ApiResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public void signup(@Valid @RequestBody SignupRequest request) {
        authService.signup(request);
    }
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        LoginResponse response = authService.login(request);
        return ApiResponse.success("로그인 성공", response);
    }
}