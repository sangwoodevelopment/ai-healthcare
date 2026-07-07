package com.healthcare.ai_healthcare.history.repository;

import com.healthcare.ai_healthcare.user.entity.User;
import com.healthcare.ai_healthcare.history.entity.AiHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AiHistoryRepository extends JpaRepository<AiHistory, Long> {

    List<AiHistory> findByUserOrderByCreatedAtDesc(User user);
    int countByUser(User user);

}