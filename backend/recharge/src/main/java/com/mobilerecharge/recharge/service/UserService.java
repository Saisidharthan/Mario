package com.mobilerecharge.recharge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobilerecharge.recharge.model.UserModel;
import com.mobilerecharge.recharge.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepo;

    public UserModel addUser(UserModel user) {
        return userRepo.save(user);
    }

    public boolean login(UserModel user1) {
        UserModel user = userRepo.findByEmail(user1.getEmail());
        if (user != null && user.getPassword().equals(user1.getPassword())) {
            return true;
        }
        return false;
    }
}
