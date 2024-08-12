package com.mobilerecharge.recharge.service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mobilerecharge.recharge.enums.PlanEnum;
import com.mobilerecharge.recharge.model.PlansModel;
import com.mobilerecharge.recharge.repository.PlansRepository;

@Service
public class PlansServices
{
    @Autowired
    private PlansRepository repository;

    public List<PlansModel> getallPlans()
    {
        return repository.findAll();
    }
    
    public PlansModel addPlan(PlansModel plan)
    {
        return repository.save(plan);
    }

    public long getPlanCount(){
        return repository.count();
    }

    public List<PlansModel> addPostmanPlan(List<PlansModel> plan)
    {
        repository.saveAll(plan);
        return repository.findAll();
    }

    public boolean deletePlan(int id) {
        repository.deleteById(id);
        return true;
    }
    public PlansModel updatePlan(PlansModel plan) {
        PlansModel existingPlan = repository.findById(plan.getId()).orElse(null);
        existingPlan.setName(plan.getName());
        existingPlan.setAmount(plan.getAmount());
        existingPlan.setValidity(plan.getValidity());
        existingPlan.setType(plan.getType());
        return repository.save(existingPlan);
    }    
    public Map<PlanEnum, Long> getPlansCountByType() {
            List<PlansModel> plans = repository.findAll();
            return plans.stream()
                    .collect(Collectors.groupingBy(PlansModel::getType, Collectors.counting()));
        }
    }
