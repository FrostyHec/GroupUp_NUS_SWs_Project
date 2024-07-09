package com.sustech.groupup.testutils;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.JsonNode;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.mapper.UserMapper;
import com.sustech.groupup.services.UserService;

@Component
public class AuthUtils {

    @Autowired
    private MockMvc mockMvc;
    private final String baseUrl = Constant.API_VERSION + "/user/public/login";

    @Autowired
    private UserService userService;
    public ResultActions login(String username, String password) throws Exception {
        String requestBody = String.format(
                """
                        {
                          "username": "%s",
                          "password": "%s"
                                       
                        }
                        """,
                username, password);
        return mockMvc.perform(MockMvcRequestBuilders.post(baseUrl)
                                                     .contentType(MediaType.APPLICATION_JSON)
                                                     .content(requestBody)
                                                     .accept(MediaType.APPLICATION_JSON));
    }

    public void register(String username, String password){
        userService.register(username, password);
    }
    public JsonNode loginAndGetAuth(String username, String password) throws Exception {
        var res = login(username, password).andExpect(status().isOk())
                                           .andExpect(RespChecker.success())
                                           .andReturn();
        var jsonNode = JsonUtils.toJson(res);
        return jsonNode.get("data");
    }
}
