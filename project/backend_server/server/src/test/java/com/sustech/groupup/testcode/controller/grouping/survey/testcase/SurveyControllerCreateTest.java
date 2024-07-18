package com.sustech.groupup.testcode.controller.grouping.survey.testcase;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.ResultActions;

import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.entity.api.SurveyDTO;
import com.sustech.groupup.testcode.controller.user.AuthAPI;
import com.sustech.groupup.testcode.controller.grouping.survey.SurveyAPI;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;

@ControllerTest
public class SurveyControllerCreateTest {

    @Autowired
    private AuthAPI authApi;

    @Autowired
    private SurveyAPI surveyAPI;
    private ResultActions create(LoginAuthDTO auth, SurveyDTO dto) throws Exception {
        return surveyAPI.create(auth, dto);
    }

    private SurveyDTO getTemplateSurveyDTO() throws Exception {
        return surveyAPI.getTemplateDTO();
    }

    @Test
    public void testAddSurveyOK() throws Exception {
        var auth = authApi.templateUserLogin();
        var res = create(auth, getTemplateSurveyDTO())
                .andExpect(RespChecker.success())
                .andReturn();
        assert JsonUtils.toJson(res).get("data").get("survey_id").asLong() == 1;
    }

}
