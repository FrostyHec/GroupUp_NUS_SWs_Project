package com.sustech.groupup.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.services.HelloWorldService;
import com.sustech.groupup.testutils.Response;

import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Constant.API_VERSION+"/hello")
@RequiredArgsConstructor
public class HelloWorldController {

    private final HelloWorldService helloService;
    @GetMapping("/hello")
    public Response sayHello() {
        var resp = helloService.getHelloMessage();
        return Response.getSuccess(resp);
    }

    @GetMapping("/bye")
    public Response sayBye() {
        var resp = helloService.getByeMessage();
        return Response.getSuccess(resp);
    }

    @GetMapping("/{number}")
    public Response showNumber(@PathVariable int number) {
        var resp = helloService.getNumberMessage(number);
        return Response.getSuccess(resp);
    }
    @GetMapping("/user/{number}")
    public Response getUser(@PathVariable int number) {
        var resp = helloService.getUser(number);
        return Response.getSuccess(resp);
    }
}
