package com.mobilerecharge.recharge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mobilerecharge.recharge.model.PurchaseModel;

@Repository
public interface PurchaseRepository extends JpaRepository<PurchaseModel, Integer> {
    List<PurchaseModel> findByuserId(int user_id);
}