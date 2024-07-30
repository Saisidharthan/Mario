package com.mobilerecharge.recharge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mobilerecharge.recharge.model.PlansModel;
import com.mobilerecharge.recharge.service.PlansServices;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/plans")
@CrossOrigin(origins = "http://localhost:5173")
public class PlanController {
    @Autowired
    private PlansServices service;

    @GetMapping
    public List<PlansModel> getPlans()
    {
        return service.getallPlans();
    }
    
    @PostMapping
    public ResponseEntity<PlansModel> addPlan(@RequestBody PlansModel plan)
    {
        PlansModel newPlan = service.addPlan(plan);
        return ResponseEntity.ok(newPlan);
    }
    
}
