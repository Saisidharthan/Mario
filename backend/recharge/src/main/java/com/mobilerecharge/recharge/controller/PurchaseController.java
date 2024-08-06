package com.mobilerecharge.recharge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mobilerecharge.recharge.model.PurchaseModel;
import com.mobilerecharge.recharge.service.PurchaseService;

@RestController
public class PurchaseController {
    @Autowired
    private PurchaseService service;

    @PostMapping("/purchase")
    public PurchaseModel purchasePlan(@RequestBody PurchaseModel purchase) {
        return service.purchasePlan(purchase);
    }

    @GetMapping("/purchase/{user_id}")
    public List<PurchaseModel> getPurchaseHistory(@PathVariable int user_id) {
        return service.getPurchaseHistory(user_id);
    }
}
