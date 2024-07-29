package com.mobilerecharge.recharge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.mobilerecharge.recharge.repository.UserRepository;
import com.mobilerecharge.recharge.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.mobilerecharge.recharge.model.UserModel;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    UserService service;

    @PostMapping("/addUser")
    public UserModel addUser(@RequestBody UserModel user) {
        return service.addUser(user);
    }

    @PostMapping("/login")
    public UserModel login(@RequestBody UserModel user) {
        boolean authenticated = service.login(user);
        if (authenticated) {
            return user;
        }
        return null;
    }
}
