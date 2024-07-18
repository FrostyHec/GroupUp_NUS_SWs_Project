package com.sustech.groupup.entity.msg_api;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum VectorMessageType {
    UPDATE(1),
    DELETE(2)
    ;
    @EnumValue
    @JsonValue
    private final int value;
    VectorMessageType(int value) {
        this.value = value;
    }
}
