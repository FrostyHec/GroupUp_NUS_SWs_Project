package com.sustech.groupup.entity;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum MessageType {
    NEW(1),
    UPDATE(2),
    DELETE(3);
    @EnumValue
    @JsonValue
    private final int value;
    MessageType(int value) {
        this.value = value;
    }
}

