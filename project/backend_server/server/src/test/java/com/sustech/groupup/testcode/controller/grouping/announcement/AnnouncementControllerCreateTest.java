package com.sustech.groupup.testcode.controller.grouping.announcement;

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
public class AnnouncementControllerCreateTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserMapper mapper;

    private ResultActions create(long surveyID, String title, String description, String createAt,
                                 String updateAt) throws Exception {
        String requestBody = String.format(
                """
                        {
                          "title": "%s",
                          "description": "%s"
                          "create_at": "%s",
                          "update_at": "%s"
                                      
                        }
                        """,
                title,description,createAt,updateAt);
        String baseUrl = Constant.API_VERSION + "/survey/"+surveyID+"/register";
        return mockMvc.perform(MockMvcRequestBuilders.post(baseUrl)
                                                     .contentType(MediaType.APPLICATION_JSON)
                                                     .content(requestBody)
                                                     .accept(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testRegisterOK() throws Exception {
    }

    @Test
    public void testRegisterDuplicate() throws Exception {
    }


}

