package com.sustech.groupup.testcode.controller;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.db.DemoEntity;
import com.sustech.groupup.entity.db.SurveyEntity;
import com.sustech.groupup.entity.db.SurveyStatus;
import com.sustech.groupup.mapper.SurveyMapper;
import com.sustech.groupup.mapper.UserMapper;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;
import com.sustech.groupup.testutils.mapper.DatabaseManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Timestamp;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ControllerTest
public class SurveyControllerTest {
    @Autowired
    private MockMvc mockMvc;
    private final String baseUrl = Constant.API_VERSION + "/survey";
    @Autowired
    private SurveyMapper mapper;
    @Autowired
    private DatabaseManager databaseManager;
    @Test
    public void testGetUserById() throws Exception {
        var id = 1;
//        var survey = new SurveyEntity(1,new Timestamp(2024,7,8,10,10,11,0),new Timestamp(2024,7,8,10,10,11,0),"demo","try", SurveyStatus.CLOSED,"");
//        mapper.insert(survey);
//        mockMvc.perform(MockMvcRequestBuilders.get(baseUrl + id)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(RespChecker.success())
//                .andExpect(RespChecker.data(survey));
//        databaseManager.clearDatabase();
    }
}

