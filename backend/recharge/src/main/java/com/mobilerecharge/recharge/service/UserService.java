package com.mobilerecharge.recharge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mobilerecharge.recharge.model.UserModel;
import com.mobilerecharge.recharge.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepo;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserModel addUser(UserModel user) {
        String hashedPassword = encoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepo.save(user);
    }

    public boolean login(UserModel user1) {
        UserModel user = userRepo.findByEmail(user1.getEmail());
        if (user != null && encoder.matches(user1.getPassword(), user.getPassword())) {
            return true;
        }
        return false;
    }
}
