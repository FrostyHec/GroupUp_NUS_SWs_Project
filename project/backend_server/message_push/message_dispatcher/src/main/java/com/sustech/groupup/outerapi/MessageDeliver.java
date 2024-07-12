package com.sustech.groupup.outerapi;

import com.sustech.groupup.entity.SingleMessageDTO;

public interface MessageDeliver {
    long pushMessage(String handlerIp, SingleMessageDTO msg);
}
