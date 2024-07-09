package com.sustech.groupup.testcode.controller.grouping.announcement;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

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
        assert JsonUtils.toJsonData(res).get("id").asLong() == 1;
    }

    @Test
    public void testNoPrivilege() throws Exception {
        var user1= apiWrapper.registerAndLogin("longzhi","123");
        var user2 = apiWrapper.registerAndLogin("fei","123");

        var sid = apiWrapper.createTemplateSurvey(user1,List.of(user1.getId()),List.of());

        apiWrapper.createAnnouncement(sid,user2,apiWrapper.getTemplateAnnouncementDTO())
                .andExpect(RespChecker.unauthorized())
                .andExpect(RespChecker.message("no-privilege"));
    }
}

