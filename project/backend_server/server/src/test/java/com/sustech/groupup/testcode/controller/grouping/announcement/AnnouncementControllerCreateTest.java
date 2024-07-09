package com.sustech.groupup.testcode.controller.grouping.announcement;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.testcode.controller.APIWrapper;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;

@ControllerTest
public class AnnouncementControllerCreateTest {

    @Autowired
    private APIWrapper apiWrapper;
    @Test
    public void testCreateOK() throws Exception {
        var dto = apiWrapper.getTemplateAnnouncementDTO();
        dto.setTitle("123");
        dto.setDescription("123");

        var auth = apiWrapper.templateUserLogin();
        var surveyID = apiWrapper.createTemplateSurvey(auth, List.of(auth.getId()),List.of());

        var res = apiWrapper.createAnnouncement(surveyID,auth,dto)
                .andExpect(RespChecker.success())
                .andReturn();
        assert JsonUtils.toJson(res).get("data").get("id").asLong() == 1;
    }
}

