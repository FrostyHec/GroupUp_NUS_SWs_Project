package com.sustech.groupup.entity.db;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RuleType {
    SINGLE_REQUIRED(1)
    ;
    @EnumValue
    @JsonValue
    private final int value;
    RuleType(int value) {
        this.value = value;
    }
}
