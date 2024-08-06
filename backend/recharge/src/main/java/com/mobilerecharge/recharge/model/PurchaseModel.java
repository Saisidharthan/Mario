package com.mobilerecharge.recharge.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PurchaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String mobileNumber;
    private String planName;
    private int planAmount;
    private String planValidity;
    private int userId;
    
    private LocalDateTime purchaseDate = LocalDateTime.now();

    // Constructors
    public PurchaseModel() {}

    public PurchaseModel(String mobileNumber, String planName, int planAmount, String planValidity, int userId) {
        this.mobileNumber = mobileNumber;
        this.planName = planName;
        this.planAmount = planAmount;
        this.planValidity = planValidity;
        this.userId = userId;
        this.purchaseDate = LocalDateTime.now();
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public int getPlanAmount() {
        return planAmount;
    }

    public void setPlanAmount(int planAmount) {
        this.planAmount = planAmount;
    }

    public String getPlanValidity() {
        return planValidity;
    }

    public void setPlanValidity(String planValidity) {
        this.planValidity = planValidity;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}
