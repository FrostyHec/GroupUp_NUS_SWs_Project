package com.sustech.groupup.outerapi;

import com.sustech.groupup.entity.MessageDTO;

public interface MessageDeliver {
    long pushMessage(String handlerIp, MessageDTO msg);
}
