package com.mobilerecharge.recharge.controller;

import com.mobilerecharge.recharge.enums.RoleEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    public String token;
    public int id;
    public String firstName;
    public String lastName;
    public String email;
    public RoleEnum role;
}
