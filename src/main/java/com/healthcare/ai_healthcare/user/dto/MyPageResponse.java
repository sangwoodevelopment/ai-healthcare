package com.healthcare.ai_healthcare.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyPageResponse {

    private Long id;
    private String email;
    private String name;
    private String role;

    private int favoriteCount;
    private int aiHistoryCount;
}