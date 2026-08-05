package com.healthcare.ai_healthcare.favorite.repository;

import com.healthcare.ai_healthcare.user.entity.User;
import com.healthcare.ai_healthcare.favorite.entity.Favorite;
import com.healthcare.ai_healthcare.hospital.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByUserAndHospital(User user, Hospital hospital);

    Optional<Favorite> findByUserAndHospital(User user, Hospital hospital);

    List<Favorite> findByUser(User user);

    int countByUser(User user);
}