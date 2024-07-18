package com.sustech.groupup.testcode.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.UserEntity;
import com.sustech.groupup.mapper.UserMapper;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;
import com.sustech.groupup.testutils.mapper.DatabaseManager;

@ControllerTest
public class HelloWorldControllerTest {
    @Autowired
    private MockMvc mockMvc;
    private final String baseUrl = Constant.API_VERSION + "/hello";
    @Autowired
    private UserMapper mapper;

    @Autowired
    private DatabaseManager databaseManager;
    @Test
    public void testGetUserById() throws Exception {
        for (int i = 1; i < 10; i++) {
            var id = 2;
            var user = new UserEntity(id, "lzs", "1145");
            mapper.insert(user);
            mockMvc.perform(MockMvcRequestBuilders.get(baseUrl + "/user/" + id)
                                                  .accept(MediaType.APPLICATION_JSON))
                   .andExpect(status().isOk())
                   .andExpect(RespChecker.success())
                   .andExpect(RespChecker.data(user));
            databaseManager.clearDatabase();
        }
    }
}

