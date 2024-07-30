package com.mobilerecharge.recharge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobilerecharge.recharge.model.ContactModel;
import com.mobilerecharge.recharge.repository.ContactRepository;

@Service
public class ContactService {
    @Autowired
    ContactRepository repo;

    public String contact(ContactModel con){
        repo.save(con);
        return "Request Received";
    }
}
