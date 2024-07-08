package com.sustech.groupup.testcode.controller.user;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import org.junit.jupiter.api.Test;
import org.junit.platform.commons.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.ResultActions;
import com.sustech.groupup.services.UserService;
import com.sustech.groupup.testutils.AuthUtils;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;
import com.sustech.groupup.testutils.mapper.DatabaseManager;

@ControllerTest
public class UserControllerLoginTest {

    @Autowired
    private DatabaseManager databaseManager;

    @Autowired
    private AuthUtils authUtils;

    private ResultActions login(String username, String password) throws Exception {
        return authUtils.login(username, password);
    }

    @Autowired
    private UserService userService;

    @Test
    public void testLoginOK() throws Exception {
        try {
            String username = "longzhi";
            String password = "123";

            userService.register(username, password);

            var token = authUtils.logAndGetAuth(username, password);

            assert StringUtils.isNotBlank(token);
        } finally {
            databaseManager.clearDatabase();
        }
    }

    @Test
    public void testLoginNoUser() throws Exception {
        try {
            String username = "longzhi";
            String password = "123";

            login(username, password)
                    .andExpect(status().isOk())
                    .andExpect(RespChecker.noFound())
                    .andExpect(RespChecker.message("user-no-found"));

        } finally {
            databaseManager.clearDatabase();
        }
    }

    @Test
    public void testLoginWrongPassword() throws Exception {
        try {
            String username = "longzhi";
            String password = "123";
            String wrongPassword = "12345";

            assert !password.equals(wrongPassword);
            userService.register(username, password);

            login(username, wrongPassword)
                    .andExpect(status().isOk())
                    .andExpect(RespChecker.badRequest())
                    .andExpect(RespChecker.message("wrong-password"));
        } finally {
            databaseManager.clearDatabase();
        }
    }
}

