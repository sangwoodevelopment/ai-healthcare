package com.healthcare.ai_healthcare.history.service;

import com.healthcare.ai_healthcare.user.entity.User;
import com.healthcare.ai_healthcare.exception.BusinessException;
import com.healthcare.ai_healthcare.exception.ErrorCode;
import com.healthcare.ai_healthcare.history.dto.AiHistoryResponse;
import com.healthcare.ai_healthcare.history.entity.AiHistory;
import com.healthcare.ai_healthcare.history.repository.AiHistoryRepository;
import com.healthcare.ai_healthcare.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AiHistoryService {

    private final AiHistoryRepository aiHistoryRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    @Transactional
    public void saveHistory(String symptom, String recommendedDepartment, String reason) {
        User user = getCurrentUser();

        AiHistory history = AiHistory.builder()
                .user(user)
                .symptom(symptom)
                .recommendedDepartment(recommendedDepartment)
                .reason(reason)
                .build();

        aiHistoryRepository.save(history);
    }

    public List<AiHistoryResponse> getMyHistories() {
        User user = getCurrentUser();

        return aiHistoryRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(history -> AiHistoryResponse.builder()
                        .id(history.getId())
                        .symptom(history.getSymptom())
                        .recommendedDepartment(history.getRecommendedDepartment())
                        .reason(history.getReason())
                        .createdAt(history.getCreatedAt())
                        .build())
                .toList();
    }
    @Transactional
    public void deleteHistory(Long historyId) {
        User user = getCurrentUser();

        AiHistory history = aiHistoryRepository.findById(historyId)
                .orElseThrow(() -> new BusinessException(ErrorCode.BAD_REQUEST));

        if (!history.getUser().getId().equals(user.getId())) {
            throw new BusinessException(ErrorCode.BAD_REQUEST);
        }

        aiHistoryRepository.delete(history);
    }
}