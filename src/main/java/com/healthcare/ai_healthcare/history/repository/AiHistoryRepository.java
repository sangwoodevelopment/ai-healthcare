package com.healthcare.ai_healthcare.history.repository;

import com.healthcare.ai_healthcare.user.dto.DepartmentStatResponse;
import com.healthcare.ai_healthcare.user.entity.User;
import com.healthcare.ai_healthcare.history.entity.AiHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AiHistoryRepository extends JpaRepository<AiHistory, Long> {

    List<AiHistory> findByUserOrderByCreatedAtDesc(User user);
    int countByUser(User user);
    @Query("""
    select new com.healthcare.ai_healthcare.user.dto.DepartmentStatResponse(
        h.recommendedDepartment,
        count(h)
    )
    from AiHistory h
    where h.user = :user
    group by h.recommendedDepartment
""")
    List<DepartmentStatResponse> countByDepartment(User user);

}