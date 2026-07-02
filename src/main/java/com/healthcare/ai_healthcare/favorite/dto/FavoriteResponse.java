package com.healthcare.ai_healthcare.favorite.dto;

import com.healthcare.ai_healthcare.favorite.entity.Favorite;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FavoriteResponse {

    private Long favoriteId;
    private Long hospitalId;
    private String hospitalName;
    private String address;
    private String phoneNumber;
    private String department;
    private String sido;
    private String sigungu;

    public static FavoriteResponse from(Favorite favorite) {
        return FavoriteResponse.builder()
                .favoriteId(favorite.getId())
                .hospitalId(favorite.getHospital().getId())
                .hospitalName(favorite.getHospital().getName())
                .address(favorite.getHospital().getAddress())
                .phoneNumber(favorite.getHospital().getPhoneNumber())
                .department(favorite.getHospital().getDepartment())
                .sido(favorite.getHospital().getSido())
                .sigungu(favorite.getHospital().getSigungu())
                .build();
    }
}