package com.sustech.groupup.testcode.controller.user.cases;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.platform.commons.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.ResultActions;

import com.sustech.groupup.services.UserService;
import com.sustech.groupup.testcode.controller.user.AuthAPI;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;

@ControllerTest
public class UserControllerLoginTest {

    @Autowired
    private AuthAPI AuthAPI;

    private ResultActions login(String username, String password) throws Exception {
        return AuthAPI.login(username, password);
    }

    @Autowired
    private UserService userService;

    @Test
    public void testLoginOK() throws Exception {
        String username = "longzhi";
        String password = "123";

        userService.register(username, password);

        var data = AuthAPI.successfulLogin(username, password);
        var id = data.getId();
        var token = data.getToken();

        assert StringUtils.isNotBlank(token);
        assert id == 1;
    }

    @Test
    public void testLoginNoUser() throws Exception {
        String username = "longzhi";
        String password = "123";

        login(username, password)
                .andExpect(status().isOk())
                .andExpect(RespChecker.noFound())
                .andExpect(RespChecker.message("user-no-found"));

    }

    @Test
    public void testLoginWrongPassword() throws Exception {
        String username = "longzhi";
        String password = "123";
        String wrongPassword = "12345";

        assert !password.equals(wrongPassword);
        userService.register(username, password);

        login(username, wrongPassword)
                .andExpect(status().isOk())
                .andExpect(RespChecker.badRequest())
                .andExpect(RespChecker.message("wrong-password"));
    }
}

