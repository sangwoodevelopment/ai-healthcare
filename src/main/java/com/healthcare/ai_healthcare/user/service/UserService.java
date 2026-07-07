package com.healthcare.ai_healthcare.user.service;

import com.healthcare.ai_healthcare.exception.BusinessException;
import com.healthcare.ai_healthcare.exception.ErrorCode;
import com.healthcare.ai_healthcare.favorite.repository.FavoriteRepository;
import com.healthcare.ai_healthcare.history.repository.AiHistoryRepository;
import com.healthcare.ai_healthcare.user.dto.DashboardResponse;
import com.healthcare.ai_healthcare.user.dto.MyPageResponse;
import com.healthcare.ai_healthcare.user.entity.User;
import com.healthcare.ai_healthcare.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final AiHistoryRepository aiHistoryRepository;

    public MyPageResponse getMyPage() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        int favoriteCount = favoriteRepository.countByUser(user);
        int aiHistoryCount = aiHistoryRepository.countByUser(user);

        return MyPageResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .favoriteCount(favoriteCount)
                .aiHistoryCount(aiHistoryCount)
                .build();
    }
    public DashboardResponse getDashboard() {
        User user = getCurrentUser();

        int favoriteCount = favoriteRepository.countByUser(user);
        int aiHistoryCount = aiHistoryRepository.countByUser(user);

        return DashboardResponse.builder()
                .favoriteCount(favoriteCount)
                .aiHistoryCount(aiHistoryCount)
                .departmentStats(aiHistoryRepository.countByDepartment(user))
                .build();
    }
    private User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }
}
