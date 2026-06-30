package com.healthcare.ai_healthcare.controller;

import com.healthcare.ai_healthcare.dto.SignupRequest;
import com.healthcare.ai_healthcare.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.healthcare.ai_healthcare.dto.LoginRequest;
import com.healthcare.ai_healthcare.dto.LoginResponse;
import com.healthcare.ai_healthcare.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;

@Tag(name = "Auth", description = "회원 인증 API")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(
            summary = "회원가입",
            description = "신규 회원을 등록합니다."
    )
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Void> signup(
            @Valid @RequestBody SignupRequest request
    ) {

        authService.signup(request);

        return ApiResponse.success("회원가입이 완료되었습니다.");
    }

    @Operation(
            summary = "로그인",
            description = "이메일과 비밀번호를 검증하고 JWT Access Token을 발급합니다."
    )
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        LoginResponse response = authService.login(request);

        return ApiResponse.success("로그인 성공", response);
    }
}