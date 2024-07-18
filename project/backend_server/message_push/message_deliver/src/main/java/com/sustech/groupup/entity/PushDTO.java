package com.sustech.groupup.entity;

import lombok.Getter;

@Getter
public class PushDTO {
    PushType pushType;
    Object body;
    public PushDTO(SingleMessageDTO singleMessageDTO){
        pushType = PushType.SINGLE;
        body = singleMessageDTO;
    }
    public PushDTO(MessagePacketDTO messagePacketDTO){
        pushType = PushType.PACKET;
        body = messagePacketDTO;
    }
}
