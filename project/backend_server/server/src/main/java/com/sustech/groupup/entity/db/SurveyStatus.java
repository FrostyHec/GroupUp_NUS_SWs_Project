package com.sustech.groupup.entity.db;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum SurveyStatus {
    CLOSED(1),
    OPENED(2),
    ARCHIVED(3)
    ;
    @EnumValue
    @JsonValue
    private final int value;
    SurveyStatus(int value) {
        this.value = value;
    }
}
