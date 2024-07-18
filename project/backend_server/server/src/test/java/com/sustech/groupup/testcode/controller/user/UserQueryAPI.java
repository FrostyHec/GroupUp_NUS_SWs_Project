package com.sustech.groupup.testcode.controller.user;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserQueryAPI {

    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    public ResultActions queryOwn(long uid, LoginAuthDTO auth, int pageSize, int pageNo) throws
                                                                                      Exception {
        String baseUrl = Constant.API_VERSION + "/user/" + uid + "/survey/own";
        return mockMvc.perform(MockMvcRequestBuilders.get(baseUrl)
                                                     .header("authorization",
                                                             "Bearer " + auth.getToken())
                                                     .param("page_size", String.valueOf(pageSize))
                                                     .param("page_no", String.valueOf(pageNo))
                                                     .accept(MediaType.APPLICATION_JSON));

    }

    public List<Long> successfulQueryOwn(long uid, LoginAuthDTO auth, int pageSize, int pageNo) throws
                                                                                                Exception {
        var res = queryOwn(uid,auth,pageSize,pageNo)
                .andExpect(RespChecker.success())
                .andReturn();
        return JsonUtils.nodeToList(JsonUtils.toJsonData(res).get("survey_ids"),Long.class);
    }

}
