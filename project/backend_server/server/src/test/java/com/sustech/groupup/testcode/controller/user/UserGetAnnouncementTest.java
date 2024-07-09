package com.sustech.groupup.testcode.controller.user;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.sustech.groupup.testcode.controller.APIWrapper;
import com.sustech.groupup.testutils.annotation.ControllerTest;

@ControllerTest
public class UserGetAnnouncementTest {

    @Autowired
    private APIWrapper apiWrapper;

    @Test
    public void testGetAnnouncement() throws Exception {
        var auth = apiWrapper.registerAndLogin("longzhi", "123");
        var sid =
                apiWrapper.createTemplateSurvey(auth, List.of(auth.getId()), List.of(auth.getId()));

        apiWrapper.successfulCreateAnnouncement(sid, auth, apiWrapper.getTemplateAnnouncementDTO());

        var res = apiWrapper.successfulGetUserOwnAnnouncement(auth, -1, 1);
        assert res.size() == 1;
        assert res.getFirst() == 1;
    }

    @Test
    public void testSelectAll() throws Exception {
        var auth = apiWrapper.registerAndLogin("longzhi", "123");
        var sid =
                apiWrapper.createTemplateSurvey(auth, List.of(auth.getId()), List.of(auth.getId()));

        int size = 17;
        for (int i = 0; i < size; i++) {
            apiWrapper.successfulCreateAnnouncement(sid, auth,
                                                    apiWrapper.getTemplateAnnouncementDTO());
        }
        var res = apiWrapper.successfulGetUserOwnAnnouncement(auth, -1, 1);
        assert res.size() == size;
    }

    @Test
    public void testSelectDividePage() throws Exception {
        var auth = apiWrapper.registerAndLogin("longzhi", "123");
        var sid =
                apiWrapper.createTemplateSurvey(auth, List.of(auth.getId()), List.of(auth.getId()));

        int total = 17, pageSize = 5;
        for (int i = 0; i < total; i++) {
            apiWrapper.successfulCreateAnnouncement(sid, auth,
                                                    apiWrapper.getTemplateAnnouncementDTO());
        }
        int i = 0;
        for (; i < total / pageSize; i++) {
            assert apiWrapper.successfulGetUserOwnAnnouncement(auth, pageSize, 1 + i)
                             .size() == pageSize;
        }
        assert apiWrapper.successfulGetUserOwnAnnouncement(auth, pageSize, 1 + i)
                         .size() == total % pageSize;

    }
}
