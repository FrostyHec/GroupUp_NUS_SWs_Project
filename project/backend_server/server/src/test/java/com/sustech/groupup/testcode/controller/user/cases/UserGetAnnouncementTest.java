package com.sustech.groupup.testcode.controller.user.cases;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.sustech.groupup.testcode.controller.user.AuthAPI;
import com.sustech.groupup.testcode.controller.grouping.announcement.AnnouncementAPI;
import com.sustech.groupup.testcode.controller.grouping.survey.SurveyAPI;
import com.sustech.groupup.testutils.annotation.ControllerTest;

@ControllerTest
public class UserGetAnnouncementTest {

    @Autowired
    private AuthAPI authApi;

    @Autowired
    private AnnouncementAPI announcementAPI;
    @Autowired
    private SurveyAPI surveyAPI;
    @Test
    public void testGetAnnouncement() throws Exception {
        var auth = authApi.registerAndLogin("longzhi", "123");
        var sid =
                surveyAPI.successfulCreateTemplate(auth, List.of(auth.getId()), List.of(auth.getId()));

        announcementAPI.successfulCreate(sid, auth, announcementAPI.getTemplateDTO());

        var res = announcementAPI.successfulGetByUser(auth, -1, 1);
        assert res.size() == 1;
        assert res.get(0) == 1;
    }

    @Test
    public void testSelectAll() throws Exception {
        var auth = authApi.registerAndLogin("longzhi", "123");
        var sid =
                surveyAPI.successfulCreateTemplate(auth, List.of(auth.getId()), List.of(auth.getId()));

        int size = 17;
        for (int i = 0; i < size; i++) {
            announcementAPI.successfulCreate(sid, auth,
                                             announcementAPI.getTemplateDTO());
        }
        var res = announcementAPI.successfulGetByUser(auth, -1, 1);
        assert res.size() == size;
    }

    @Test
    public void testSelectDividePage() throws Exception {
        var auth = authApi.registerAndLogin("longzhi", "123");
        var sid =
                surveyAPI.successfulCreateTemplate(auth, List.of(auth.getId()), List.of(auth.getId()));

        int total = 17, pageSize = 5;
        for (int i = 0; i < total; i++) {
            announcementAPI.successfulCreate(sid, auth,
                                             announcementAPI.getTemplateDTO());
        }
        int i = 0;
        for (; i < total / pageSize; i++) {
            assert announcementAPI.successfulGetByUser(auth, pageSize, 1 + i)
                             .size() == pageSize;
        }
        assert announcementAPI.successfulGetByUser(auth, pageSize, 1 + i)
                         .size() == total % pageSize;

    }
}
