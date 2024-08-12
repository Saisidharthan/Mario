package com.mobilerecharge.recharge.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import com.mobilerecharge.recharge.enums.PlanEnum;
import com.mobilerecharge.recharge.model.PlansModel;
import com.mobilerecharge.recharge.service.PlansServices;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class PlanController {
    @Autowired
    private PlansServices service;

    @GetMapping("/plans")
    public List<PlansModel> getPlans()
    {
        return service.getallPlans();
    }
    
    @PostMapping("/plans")
    public ResponseEntity<PlansModel> addPlan(@RequestBody PlansModel plan)
    {
        PlansModel newPlan = service.addPlan(plan);
        return ResponseEntity.ok(newPlan);
    }

    @PostMapping("/addPostmanPlan")
    public ResponseEntity<List<PlansModel>> addPostmanPlan(@RequestBody List<PlansModel> plan)
    {
        List<PlansModel> newPlan = service.addPostmanPlan(plan);
        return ResponseEntity.ok(newPlan);
    }

    @GetMapping("/plans/planCount")
    public long getPlanCount(){
        return service.getPlanCount();
    }

    @DeleteMapping("/plandelete/{id}")
    public boolean deletePlan(@PathVariable int id)
    {
        return service.deletePlan(id);
    }
    @PutMapping("/planupdate/{id}")
    public ResponseEntity<PlansModel> updatePlan(@RequestBody PlansModel plan)
    {
        PlansModel updatedPlan = service.updatePlan(plan);
        return ResponseEntity.ok(updatedPlan);
    }

    @GetMapping("/plans/countByType")
    public Map<PlanEnum, Long> getPlansCountByType() {
        return service.getPlansCountByType();
    }
}
