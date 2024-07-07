package com.sustech.groupup.testutils;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.springframework.test.web.servlet.ResultMatcher;

public class RespChecker {
    public static ResultMatcher success(){
        return jsonPath("$.code").value(ResponseCodeType.SUCCESS.getCode());
    }
    public static ResultMatcher notModified(){
        return jsonPath("$.code").value(ResponseCodeType.NOT_MODIFIED.getCode());
    }

    public static ResultMatcher badRequest(){
        return jsonPath("$.code").value(ResponseCodeType.BAD_REQUEST.getCode());
    }

    public static ResultMatcher unauthorized(){
        return jsonPath("$.code").value(ResponseCodeType.UNAUTHORIZED.getCode());
    }

    public static ResultMatcher noFound(){
        return jsonPath("$.code").value(ResponseCodeType.NO_FOUND.getCode());
    }

    public static ResultMatcher internalError(){
        return jsonPath("$.code").value(ResponseCodeType.INTERNAL_ERROR.getCode());
    }

    public static ResultMatcher message(String msg){
        return jsonPath("$.msg").value(msg);
    }

    public static ResultMatcher data(Object value){
        return jsonPath("$.data").value(value);
    }
}
