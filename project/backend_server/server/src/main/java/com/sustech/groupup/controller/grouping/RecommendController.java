package com.sustech.groupup.controller.grouping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustech.groupup.config.Constant;

import lombok.RequiredArgsConstructor;

//TODO 先写随机，没准这一部分后面用python写
@RestController
@RequestMapping(Constant.API_VERSION + "/survey/{id}/recommend")
@RequiredArgsConstructor
public class RecommendController {

}
