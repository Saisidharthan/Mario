package com.mobilerecharge.recharge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.mobilerecharge.recharge.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.mobilerecharge.recharge.model.UserModel;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    UserService service;

    @PostMapping("/addUser")
    public boolean addUser(@RequestBody UserModel user) {
        UserModel user1 = service.addUser(user);
        if(user1 != null) {
            return true;
        }
        return false;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody UserModel user) {
        boolean authenticated = service.login(user);
        if (authenticated) {
            return true;
        }
        return false;
    }
}
