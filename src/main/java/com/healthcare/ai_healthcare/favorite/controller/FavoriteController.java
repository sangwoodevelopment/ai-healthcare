package com.healthcare.ai_healthcare.favorite.controller;

import com.healthcare.ai_healthcare.common.response.ApiResponse;
import com.healthcare.ai_healthcare.favorite.dto.FavoriteResponse;
import com.healthcare.ai_healthcare.favorite.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@Tag(name = "Favorite", description = "즐겨찾기 API")
@SecurityRequirement(name = "bearerAuth")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Operation(summary = "즐겨찾기 추가")
    @PostMapping("/{hospitalId}")
    public ApiResponse<Void> addFavorite(
            @PathVariable Long hospitalId
    ) {

        favoriteService.addFavorite(hospitalId);

        return ApiResponse.success("즐겨찾기에 추가되었습니다.");
    }

    @Operation(summary = "즐겨찾기 목록 조회")
    @GetMapping
    public ApiResponse<List<FavoriteResponse>> getFavorites() {

        return ApiResponse.success(
                "즐겨찾기 조회 성공",
                favoriteService.getFavorites()
        );
    }

    @Operation(summary = "즐겨찾기 삭제")
    @DeleteMapping("/{hospitalId}")
    public ApiResponse<Void> deleteFavorite(
            @PathVariable Long hospitalId
    ) {

        favoriteService.deleteFavorite(hospitalId);

        return ApiResponse.success("즐겨찾기가 삭제되었습니다.");
    }
}