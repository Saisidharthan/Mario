package com.mobilerecharge.recharge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mobilerecharge.recharge.model.PurchaseModel;
import com.mobilerecharge.recharge.enums.PlanEnum;

@Repository
public interface PurchaseRepository extends JpaRepository<PurchaseModel, Integer> {
    List<PurchaseModel> findByuserId(int user_id);

    @Query("SELECT COUNT(userId) FROM PurchaseModel WHERE type = ?1")
    int findByPlanName(PlanEnum planType);
}