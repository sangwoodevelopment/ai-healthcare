package com.healthcare.ai_healthcare.favorite.service;

import com.healthcare.ai_healthcare.entity.User;
import com.healthcare.ai_healthcare.exception.BusinessException;
import com.healthcare.ai_healthcare.exception.ErrorCode;
import com.healthcare.ai_healthcare.favorite.dto.FavoriteResponse;
import com.healthcare.ai_healthcare.favorite.entity.Favorite;
import com.healthcare.ai_healthcare.favorite.repository.FavoriteRepository;
import com.healthcare.ai_healthcare.hospital.entity.Hospital;
import com.healthcare.ai_healthcare.hospital.repository.HospitalRepository;
import com.healthcare.ai_healthcare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final HospitalRepository hospitalRepository;
    private final UserRepository userRepository;

    /**
     * 임시 사용자 조회
     * JWT에서 가져오도록 업데이트 예정
     */
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    @Transactional
    public void addFavorite(Long hospitalId) {

        User user = getCurrentUser();

        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new BusinessException(ErrorCode.HOSPITAL_NOT_FOUND));

        if (favoriteRepository.existsByUserAndHospital(user, hospital)) {
            return;
        }

        favoriteRepository.save(new Favorite(user, hospital));
    }

    public List<FavoriteResponse> getFavorites() {

        User user = getCurrentUser();

        return favoriteRepository.findByUser(user)
                .stream()
                .map(FavoriteResponse::from)
                .toList();
    }

    @Transactional
    public void deleteFavorite(Long hospitalId) {

        User user = getCurrentUser();

        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new BusinessException(ErrorCode.HOSPITAL_NOT_FOUND));

        Favorite favorite = favoriteRepository.findByUserAndHospital(user, hospital)
                .orElseThrow(() -> new BusinessException(ErrorCode.BAD_REQUEST));

        favoriteRepository.delete(favorite);
    }
}