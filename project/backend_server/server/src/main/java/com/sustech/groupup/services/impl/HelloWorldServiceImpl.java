package com.sustech.groupup.services.impl;

import com.sustech.groupup.mapper.UserMapper;
import com.sustech.groupup.services.HelloWorldService;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HelloWorldServiceImpl implements HelloWorldService {
    @Override
    public String getHelloMessage() {
        return "hello world";
    }

    @Override
    public String getByeMessage() {
        return "bye";
    }

    @Override
    public String getNumberMessage(int number) {
        return String.valueOf(number);
    }
}
