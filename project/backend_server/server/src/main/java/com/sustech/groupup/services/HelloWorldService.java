package com.sustech.groupup.services;

import com.sustech.groupup.entity.db.DemoEntity;

public interface HelloWorldService {
    String getHelloMessage();

    String getByeMessage();

    String getNumberMessage(int number);

    DemoEntity getUser(int number);
}
