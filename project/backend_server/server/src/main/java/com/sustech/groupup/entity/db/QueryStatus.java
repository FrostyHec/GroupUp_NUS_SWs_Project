package com.sustech.groupup.entity.db;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum QueryStatus {
    EDITING(1),
    DONE(2);
    @EnumValue
    @JsonValue
    private final int value;
    QueryStatus(int value) {
        this.value = value;
    }
}
