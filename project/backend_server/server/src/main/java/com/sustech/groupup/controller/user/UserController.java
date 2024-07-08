package com.sustech.groupup.controller.user;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.services.UserService;
import com.sustech.groupup.utils.Response;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Constant.API_VERSION + "/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @PostMapping("/public/login")
    public Response login(String username, String password){
        // TODO
        String token = userService.login(username, password);
        return Response.getSuccess(token);
    }

    @PostMapping("/public/register")
    public Response register(String username, String password){
        userService.register(username, password);
        return Response.getSuccess();
    }

    @PostMapping("/{id}/survey/own")
    public Response queryOwnSurvey(@PathVariable int id,
                                   @NonNull String pageSize,
                                   @NonNull String pageNo
    ) {
        List<Long> res = userService.queryOwnSurvey(id, pageSize, pageNo);
        return Response.getSuccess(Map.of("survey_ids", res));
    }

    @PostMapping("/{id}/survey/participate")
    public Response queryParticipateSurvey(@PathVariable int id,
                                           @NonNull String pageSize,
                                           @NonNull String pageNo
    )throws Exception {
        List<Long> res = userService.queryParticipateSurvey(id, pageSize, pageNo);
        return Response.getSuccess(Map.of("survey_ids", res));
    }

    @PostMapping("/{id}/announcement/received")
    public Response queryReceivedAnnouncement(@PathVariable int id,
                                        @NonNull String pageSize,
                                        @NonNull String pageNo
    ) {
        List<Long> res = userService.queryReceivedAnnouncement(id, pageSize, pageNo);
        return Response.getSuccess(Map.of("ids", res));
    }
}
