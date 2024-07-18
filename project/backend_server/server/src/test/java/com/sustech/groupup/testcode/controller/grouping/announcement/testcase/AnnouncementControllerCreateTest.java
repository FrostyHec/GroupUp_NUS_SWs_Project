package com.sustech.groupup.testcode.controller.grouping.announcement.testcase;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.sustech.groupup.testcode.controller.user.AuthAPI;
import com.sustech.groupup.testcode.controller.grouping.announcement.AnnouncementAPI;
import com.sustech.groupup.testcode.controller.grouping.survey.SurveyAPI;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;

@ControllerTest
public class AnnouncementControllerCreateTest {

    @Autowired
    private AuthAPI authApi;
    @Autowired
    private AnnouncementAPI announcementAPI;
    @Autowired
    private SurveyAPI surveyAPI;
    @Test
    public void testCreateOK() throws Exception {
        var dto = announcementAPI.getTemplateDTO();
        dto.setTitle("123");
        dto.setDescription("123");

        var auth = authApi.templateUserLogin();
        var surveyID = surveyAPI.successfulCreateTemplate(auth, List.of(auth.getId()), List.of());

        assert announcementAPI.successfulCreate(surveyID, auth, dto) == 1;
    }

    @Test
    public void testNoPrivilege() throws Exception {
        var user1 = authApi.registerAndLogin("longzhi", "123");
        var user2 = authApi.registerAndLogin("fei", "123");

        var sid = surveyAPI.successfulCreateTemplate(user1, List.of(user1.getId()), List.of());

        announcementAPI.create(sid, user2, announcementAPI.getTemplateDTO())
                  .andExpect(RespChecker.unauthorized())
                  .andExpect(RespChecker.message("no-privilege"));
    }
}

