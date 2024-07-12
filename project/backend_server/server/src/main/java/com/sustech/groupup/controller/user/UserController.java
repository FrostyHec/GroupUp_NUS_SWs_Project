package com.sustech.groupup.controller.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sustech.groupup.entity.api.GroupWithMemberDTO;
import com.sustech.groupup.entity.db.RequestEntity;
import com.sustech.groupup.services.RequestService;
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
    private final RequestService requestService;

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
                                   int page_size,
                                   int page_no
    ) {
        if (page_size < -1 || page_size == 0 || page_no <= 0) {
            return Response.getInternalError("bad-params");
        }
        List<Long> res = userService.queryOwnSurvey(id, page_size, page_no);
        return Response.getSuccess(Map.of("survey_ids", res));
    }

    @GetMapping("/{id}/survey/participate")
    public Response queryParticipateSurvey(@PathVariable long id,
                                           int page_size,
                                           int page_no
    ) {
        if (page_size < -1 || page_size == 0 || page_no <= 0) {
            return Response.getInternalError("bad-params");
        }
        List<Long> res = userService.queryParticipateSurvey(id, page_size, page_no);
        return Response.getSuccess(Map.of("survey_ids", res));
    }

    @GetMapping("/{id}/announcement/received")
    public Response queryReceivedAnnouncement(@PathVariable long id,
                                              int page_size,
                                              int page_no
    ) {
        List<Long> res = userService.queryReceivedAnnouncement(id, page_size, page_no);
        return Response.getSuccess(Map.of("ids", res));
    }

    @GetMapping("/{id}/sendrequest")
    public Response getRequestListByFromId(@PathVariable long id,
                                             @RequestParam(defaultValue = "-1") int pageSize,
                                             @RequestParam(defaultValue = "1") int pageNo) {
        IPage<RequestEntity> queryResult= requestService.getRequestListByFromId(id, pageNo, pageSize);
        Map<String, Object> data = new HashMap<>();
        data.put("total_size", queryResult.getSize());
        data.put("list", queryResult.getRecords());
        return Response.getSuccess("success",data);
    }

}
