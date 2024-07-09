package com.sustech.groupup.testcode.controller.user;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.services.UserService;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthAPI {

    private final MockMvc mockMvc;
    private final UserService userService;
    private final ObjectMapper objectMapper;

    public ResultActions login(String username, String password) throws Exception {
        String baseUrl = Constant.API_VERSION + "/user/public/login";
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

    public void register(String username, String password) {
        userService.register(username, password);
    }

    public LoginAuthDTO loginAndGetAuth(String username, String password) throws Exception {
        var res = login(username, password).andExpect(status().isOk())
                                           .andExpect(RespChecker.success())
                                           .andReturn();
        var jsonNode = JsonUtils.toJson(res);
        return objectMapper.treeToValue(jsonNode.get("data"), LoginAuthDTO.class);
    }

    public LoginAuthDTO templateUserLogin() throws Exception {
        String username = "username";
        String password = "password";
        return registerAndLogin(username, password);
    }

    public LoginAuthDTO registerAndLogin(String username, String password) throws Exception {
        register(username, password);
        return loginAndGetAuth(username, password);
    }

}
