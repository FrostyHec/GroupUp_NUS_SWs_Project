package com.sustech.groupup.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.sustech.groupup.exception.ExternalException;
import com.sustech.groupup.exception.InternalException;
import com.sustech.groupup.utils.Response;
import com.sustech.groupup.utils.ResponseCodeType;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestControllerAdvice
public class ExceptionAdvisor {
    @ExceptionHandler(InternalException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Response exceptionHandler(InternalException e) {
        log.error("InternalException:", e);
        return new Response(ResponseCodeType.INTERNAL_ERROR,
                            e.getMessage(),
                            e.getCause());
    }

    @ExceptionHandler(ExternalException.class)
    @ResponseStatus(HttpStatus.OK)
    public Response exceptionHandler(ExternalException e) {
        log.error("ExternalException:", e);
        return e.getResponse();
    }
}