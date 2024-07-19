package com.sustech.groupup.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.service.SSEService;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping(Constant.API_VERSION + "/sse")
@RequiredArgsConstructor
public class MessagePushController {

    private final SSEService service;

    @GetMapping("/register/{uid}")
    public SseEmitter register(@PathVariable long uid) {
        log.info("connection creating on uid:"+uid);
        return service.register(uid);
    }

    @PostMapping("/push")
    public Response push(@RequestBody SingleMessageDTO dto) {
        log.info("pushing message:"+dto);
        long id =  service.push(dto);
        log.warn("message pushed with no error:"+dto);
        return Response.getSuccess(Map.of("mid",id));
    }
}
