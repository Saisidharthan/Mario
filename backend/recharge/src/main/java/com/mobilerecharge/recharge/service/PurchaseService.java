package com.mobilerecharge.recharge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobilerecharge.recharge.model.PurchaseModel;
import com.mobilerecharge.recharge.repository.PurchaseRepository;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository repo;

    public PurchaseModel purchasePlan(PurchaseModel purchase) {
        return repo.save(purchase);
    }

    public List<PurchaseModel> getPurchaseHistory(int user_id) {
        return repo.findByuserId(user_id);
    }
}
