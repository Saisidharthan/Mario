package com.mobilerecharge.recharge.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mobilerecharge.recharge.enums.RoleEnum;
import com.mobilerecharge.recharge.model.UserModel;
import com.mobilerecharge.recharge.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepo;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserModel addAdminUser(UserModel user) {
        String hashedPassword = encoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        user.setRole(RoleEnum.ADMIN);
        return userRepo.save(user);
    }

    public UserModel addUser(UserModel user) {
        String hashedPassword = encoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        user.setRole(RoleEnum.USER);
        return userRepo.save(user);
    }

    public UserModel login(UserModel user1) {
        UserModel user = userRepo.findByEmail(user1.getEmail());
        if (user != null && encoder.matches(user1.getPassword(), user.getPassword())) {
            return user;
        }
        return null;
    }

    public List<UserModel> getAllUsers() {
        return userRepo.findAll();
    }
    public long getUserCount() {
        return userRepo.countByRole(RoleEnum.USER);
    }
    public List<UserModel> getUsers(){
        return userRepo.findAll();
    }

    public boolean deleteUserById(int id) {
        Optional<UserModel> user = userRepo.findById(id);
        if (user.isPresent()) {
            userRepo.delete(user.get());
            return true;
        }
        return false;
    }
    public boolean updateUser(int id, UserModel updatedUser) {
        Optional<UserModel> existingUser = userRepo.findById(id);
        if (existingUser.isPresent()) {
            existingUser.get().setFirstName(updatedUser.getFirstName());
            existingUser.get().setLastName(updatedUser.getLastName());
            existingUser.get().setEmail(updatedUser.getEmail());
            existingUser.get().setRole(updatedUser.getRole());
            userRepo.save(existingUser.get());
            return true;
        }
        return false;

    }


}
