package com.sustech.groupup.utils;

import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum ResponseCodeType {
    SUCCESS(200),
    NOT_MODIFIED(304),
    BAD_REQUEST(400),
    UNAUTHORIZED(401),
    NO_FOUND(404),
    INTERNAL_ERROR(500);

    private final int code;
    ResponseCodeType(int value) {
        this.code = value;
    }
}

