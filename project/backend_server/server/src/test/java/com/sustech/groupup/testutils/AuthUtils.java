package com.sustech.groupup.testutils;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.sustech.groupup.JsonUtils;
import com.sustech.groupup.config.Constant;

@Component
public class AuthUtils {

    @Autowired
    private MockMvc mockMvc;
    private final String baseUrl = Constant.API_VERSION + "/user/public/login";

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

    public String logAndGetAuth(String username, String password) throws Exception {
        var res = login(username, password).andExpect(status().isOk())
                                           .andExpect(RespChecker.success())
                                           .andReturn();
        var jsonNode = JsonUtils.toJson(res);
        return jsonNode.get("data").asText();
    }
}
