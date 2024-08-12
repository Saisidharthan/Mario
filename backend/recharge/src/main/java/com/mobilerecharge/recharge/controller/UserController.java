package com.mobilerecharge.recharge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.mobilerecharge.recharge.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mobilerecharge.recharge.dto.ChangePasswordRequest;
import com.mobilerecharge.recharge.model.UserModel;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {
    @Autowired
    UserService service;

    @GetMapping("/user/{id}")
    public UserModel getUserById(@PathVariable int id) {
        return service.getUserById(id);
    }

    @GetMapping("/users")
    public List<UserModel> getUsers() {
        return service.getUsers();
    }

    @PostMapping("/addAdminUser")
    public boolean addAdminUser(@RequestBody UserModel user) {
        UserModel user1 = service.addAdminUser(user);
        if(user1 != null) {
            return true;
        }
        return false;
    }

    @PostMapping("/addUser")
    public AuthenticationResponse addUser(@RequestBody UserModel user) {
        AuthenticationResponse user1 = service.addUser(user);
        if(user1 != null) {
            return user1;
        }
        return null;
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody UserModel user) {
        AuthenticationResponse authenticated = service.login(user);
        if (authenticated!=null) {
            return authenticated;
        }
        return null;
    }

    @GetMapping("/userCount")
    public long getUserCount() {
        return service.getUserCount();
    }

    @DeleteMapping("/deleteUser/{id}")
    public boolean deleteUserById(@PathVariable int id) {
        return service.deleteUserById(id);
    }
    @PatchMapping("/updateUser/{id}")
    public boolean updateUser(@PathVariable int id, @RequestBody UserModel user) {
        return service.updateUser(id,user);
    }

    @PatchMapping("/updateUserPassword/{id}")
    public boolean updateUserPassword(@PathVariable int id, @RequestBody UserModel user) {
        return service.updateUserPassword(id,user);
    }

    @PatchMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            service.changePassword(request.getUserId(), request.getCurrentPassword(), request.getNewPassword());
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password");
        }
    }

}
