package com.healthcare.ai_healthcare.history.controller;

import com.healthcare.ai_healthcare.common.response.ApiResponse;
import com.healthcare.ai_healthcare.history.dto.AiHistoryResponse;
import com.healthcare.ai_healthcare.history.service.AiHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "AI History", description = "AI 분석 이력 API")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/ai/histories")
@RequiredArgsConstructor
public class AiHistoryController {

    private final AiHistoryService aiHistoryService;

    @Operation(summary = "내 AI 분석 이력 조회")
    @GetMapping
    public ApiResponse<List<AiHistoryResponse>> getMyHistories() {
        return ApiResponse.success(
                "AI 분석 이력 조회 성공",
                aiHistoryService.getMyHistories()
        );
    }
    @DeleteMapping("/{historyId}")
    public ApiResponse<Void> deleteHistory(@PathVariable Long historyId) {
        aiHistoryService.deleteHistory(historyId);
        return ApiResponse.success("AI 분석 이력 삭제 성공");
    }
}