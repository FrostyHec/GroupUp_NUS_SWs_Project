package com.sustech.groupup.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.MessageDTO;
import com.sustech.groupup.entity.MessageType;
import com.sustech.groupup.exception.ExternalException;
import com.sustech.groupup.service.MessageDispatchService;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Constant.API_VERSION + "/msg_push")
@RequiredArgsConstructor
public class MessageDispatchController {

    private final MessageDispatchService service;

    @PostMapping
    public Response push(@RequestBody MessageDTO msg) {
        if (msg.getType() != MessageType.NEW && msg.getMessageId() == null) {
            throw new ExternalException(Response.getBadRequest("msgid-missing"));
        }
        long mid = service.push(msg);
        return Response.getSuccess(Map.of("mid",mid));
    }
    @GetMapping("/ack/{mid}")
    public Response ack(@PathVariable long mid){
        service.ack(mid);
        return Response.getSuccess();
    }
}
