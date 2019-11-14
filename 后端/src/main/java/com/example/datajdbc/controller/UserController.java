package com.example.datajdbc.controller;


import com.example.datajdbc.bean.User;
import com.example.datajdbc.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserMapper userMapper;

    @GetMapping("/alluser")
    public List<User> getalluser(){
        return userMapper.getAllUser();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") Integer id){
        return userMapper.getUserById(id);
    }

    @GetMapping("/user")
    public User insertUser(User user){
        userMapper.insertUser(user);
        return user;
    }

    @GetMapping("/user/del/{id}")
    public String deleteUser(@PathVariable("id") Integer id) {
        userMapper.deleteUserById(id);
        return "success";
    }
}
