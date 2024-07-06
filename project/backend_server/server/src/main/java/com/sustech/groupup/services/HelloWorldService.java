package com.sustech.groupup.services;

import com.sustech.groupup.entity.UserEntity;

public interface HelloWorldService {
    String getHelloMessage();

    String getByeMessage();

    String getNumberMessage(int number);

    UserEntity getUser(int number);
}
