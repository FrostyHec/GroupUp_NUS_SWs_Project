package com.sustech.groupup.utils;

import lombok.Data;

@Data
public class Response {
    private int code;
    private String msg;
    private Object data;

    public Response(ResponseCodeType codeType, String msg, Object data) {
        this.code = codeType.getCode();
        this.msg = msg;
        this.data = data;
    }

    //success
    public static Response getSuccess(String msg, Object data) {
        return new Response(ResponseCodeType.SUCCESS, msg, data);
    }

    public static Response getSuccess(Object data) {
        System.out.println(data);
        System.out.println(new Response(ResponseCodeType.SUCCESS, "success", data));
        return new Response(ResponseCodeType.SUCCESS, "", data);
    }

    public static Response getSuccess() {
        return new Response(ResponseCodeType.SUCCESS, "", null);
    }

    //not modified
    public static Response getNotModified(String msg) {
        return new Response(ResponseCodeType.NOT_MODIFIED, msg, null);
    }

    public static Response getNotModified() {
        return new Response(ResponseCodeType.NOT_MODIFIED, "", null);
    }

    //bad request
    public static Response getBadRequest(String msg) {
        return new Response(ResponseCodeType.BAD_REQUEST, msg, null);
    }

    //unauthorized
    public static Response getUnauthorized(String msg) {
        return new Response(ResponseCodeType.UNAUTHORIZED, msg, null);
    }

    //not found
    public static Response getNotFound(String msg) {
        return new Response(ResponseCodeType.NO_FOUND, msg, null);
    }

    public static Response getInternalError(String msg) {
        return new Response(ResponseCodeType.INTERNAL_ERROR, msg, null);
    }
}
