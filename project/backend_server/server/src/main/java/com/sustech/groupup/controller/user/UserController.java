package com.sustech.groupup.controller.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustech.groupup.config.Constant;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Constant.API_VERSION + "/user")
@RequiredArgsConstructor
public class UserController {

}
