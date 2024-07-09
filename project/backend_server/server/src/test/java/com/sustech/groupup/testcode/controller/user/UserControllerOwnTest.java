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
public class UserControllerOwnTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserMapper mapper;

    private ResultActions queryOwn(int id, int pageSize, int pageNo) throws Exception {
        final String baseUrl = Constant.API_VERSION + "/user/"+id+"/survey/own";
        String requestBody = String.format(
                """
                        {
                          "page-size": "%d",
                          "page-no": "%d"
                                       
                        }
                        """,
                pageSize,pageNo);
        return mockMvc.perform(MockMvcRequestBuilders.post(baseUrl)
                                                     .contentType(MediaType.APPLICATION_JSON)
                                                     .content(requestBody)
                                                     .accept(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testQueryNormal() throws Exception {
        int id = 1;
        int pageSize = 10;
        int pageNo = 1;
        queryOwn(id,pageSize,pageNo)
                .andExpect(status().isOk())
                .andExpect(RespChecker.success());
        //TODO
    }
}

