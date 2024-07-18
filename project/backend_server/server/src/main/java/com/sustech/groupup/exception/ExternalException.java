package com.sustech.groupup.exception;


import com.sustech.groupup.testutils.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ExternalException extends RuntimeException{
    private Response response;
}
