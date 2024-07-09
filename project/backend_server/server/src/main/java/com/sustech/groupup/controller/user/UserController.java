package com.sustech.groupup.controller.user;

import java.util.List;
import java.util.Map;

import org.springframework.boot.autoconfigure.condition.ConditionalOnNotWarDeployment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.LoginDTO;
import com.sustech.groupup.entity.api.RegisterDTO;
import com.sustech.groupup.entity.api.UserPublicQueryDTO;
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
    public Response login(@NonNull @RequestBody LoginDTO login) {
        var auth = userService.login(login.getUsername(), login.getPassword());
        return Response.getSuccess(auth);
    }

    @PostMapping("/public/register")
    public Response register(@RequestBody @NonNull RegisterDTO user) {
        userService.register(user.getUsername(), user.getPassword());
        return Response.getSuccess();
    }

    @GetMapping("/public/query")
    public Response publicUserQuery(@RequestParam("find_username") @NonNull String findUsername) {
        List<UserPublicQueryDTO> res = userService.queryUserLikeName(findUsername);
        return Response.getSuccess(Map.of("users", res));
    }

    @GetMapping("/{id}/survey/own")
    public Response queryOwnSurvey(@PathVariable long id,
                                   int pageSize,
                                   int pageNo
    ) {
        if (pageSize < -1 || pageSize == 0 || pageNo <= 0) {
            return Response.getInternalError("bad-params");
        }
        List<Long> res = userService.queryOwnSurvey(id, pageSize, pageNo);
        return Response.getSuccess(Map.of("survey_ids", res));
    }

    @GetMapping("/{id}/survey/participate")
    public Response queryParticipateSurvey(@PathVariable long id,
                                           int pageSize,
                                           int pageNo
    ) {
        if (pageSize < -1 || pageSize == 0 || pageNo <= 0) {
            return Response.getInternalError("bad-params");
        }
        List<Long> res = userService.queryParticipateSurvey(id, pageSize, pageNo);
        return Response.getSuccess(Map.of("survey_ids", res));
    }

    @GetMapping("/{id}/announcement/received")
    public Response queryReceivedAnnouncement(@PathVariable long id,
                                              int pageSize,
                                              int pageNo
    ) {
        List<Long> res = userService.queryReceivedAnnouncement(id, pageSize, pageNo);
        return Response.getSuccess(Map.of("ids", res));
    }
}
