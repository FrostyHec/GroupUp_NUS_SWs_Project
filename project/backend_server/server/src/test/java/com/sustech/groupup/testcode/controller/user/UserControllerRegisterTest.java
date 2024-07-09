package com.sustech.groupup.testcode.controller.user;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.mapper.UserMapper;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;

@ControllerTest
public class UserControllerRegisterTest {

    @Autowired
    private MockMvc mockMvc;
    private final String baseUrl = Constant.API_VERSION + "/user/public/register";
    @Autowired
    private UserMapper mapper;

    private ResultActions register(String username, String password) throws Exception {
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

    @Test
    public void testRegisterOK() throws Exception {
        String username = "longzhi";
        String password = "123";
        register(username, password)
                .andExpect(status().isOk())
                .andExpect(RespChecker.success());

        var res = mapper.selectByMap(Map.of("username", "longzhi"));
        assert res.size() == 1;

        var user = res.getFirst();
        assert user.getUsername().equals(username);
    }

    @Test
    public void testRegisterDuplicate() throws Exception {
        String username = "longzhi";
        String password = "123";
        register(username, password)
                .andExpect(status().isOk())
                .andExpect(RespChecker.success());

        register(username, password)
                .andExpect(status().isOk())
                .andExpect(RespChecker.badRequest())
                .andExpect(RespChecker.message("user-duplicate"));

        var res = mapper.selectByMap(Map.of("username", "longzhi"));
        assert res.size() == 1;

        var user = res.getFirst();
        assert user.getUsername().equals(username);
    }
}

