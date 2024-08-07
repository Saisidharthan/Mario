package com.mobilerecharge.recharge.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mobilerecharge.recharge.config.JwtService;
import com.mobilerecharge.recharge.controller.AuthenticationResponse;
import com.mobilerecharge.recharge.enums.RoleEnum;
import com.mobilerecharge.recharge.model.UserModel;
import com.mobilerecharge.recharge.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    UserRepository userRepo;

    private final PasswordEncoder encoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public UserModel addAdminUser(UserModel user) {
        String hashedPassword = encoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepo.save(user);
    }

    public AuthenticationResponse addUser(UserModel user) {
        var user1 = UserModel.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .password(encoder.encode(user.getPassword()))
                .role(RoleEnum.USER)
                .build();
        userRepo.save(user1);
        UserModel newUser = userRepo.findByEmail(user.getEmail()).get();
        var jwtToken = jwtService.generateToken(user1);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .id(newUser.getId())
            .firstName(newUser.getFirstName())
            .lastName(newUser.getLastName())
            .email(newUser.getEmail())
            .role(newUser.getRole())
            .build();
    }

    public AuthenticationResponse login(UserModel user1) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user1.getEmail(), user1.getPassword())
        );
        var newUser = userRepo.findByEmail(user1.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user1);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .id(newUser.getId())
            .firstName(newUser.getFirstName())
            .lastName(newUser.getLastName())
            .email(newUser.getEmail())
            .role(newUser.getRole())
            .build();
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

    public boolean updateUserPassword(int id, UserModel updatedUser) {
        Optional<UserModel> existingUser = userRepo.findById(id);
        if (existingUser.isPresent()) {
            String hashedPassword = encoder.encode(updatedUser.getPassword());
            existingUser.get().setPassword(hashedPassword);
            userRepo.save(existingUser.get());
            return true;
        }
        return false;
    }


}
