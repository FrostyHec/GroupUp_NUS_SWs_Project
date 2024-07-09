package com.sustech.groupup.testcode.controller.user.cases;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.UserPublicQueryDTO;
import com.sustech.groupup.testcode.controller.user.AuthAPI;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.annotation.ControllerTest;

@ControllerTest
public class UserControllerPublicQueryTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthAPI AuthAPI;

    private List<UserPublicQueryDTO> publicQuery(String username) throws Exception {
        final String baseUrl =
                Constant.API_VERSION + "/user/public/query";

        var mvcRes = mockMvc.perform(MockMvcRequestBuilders.get(baseUrl)
                                                           .param("find_username", username)
                                                           .accept(MediaType.APPLICATION_JSON))
                            .andExpect(status().isOk())
                            .andExpect(RespChecker.success())
                            .andReturn();
        var json = JsonUtils.toJson(mvcRes).get("data").get("users");
        assert json.isArray();
        List<UserPublicQueryDTO> ans = new ArrayList<>();
        for (var item : json) {
            long id = item.get("id").asLong();
            String name = item.get("username").asText();
            ans.add(new UserPublicQueryDTO(id, name));
        }
        return ans;
    }

    @Test
    public void testQueryExact() throws Exception {
        AuthAPI.forceRegister("longzhi", "0");
        AuthAPI.forceRegister("fei", "1");
        var data = publicQuery("longzhi");
        assert data.size() == 1;
        assert data.get(0).equals(new UserPublicQueryDTO(1, "longzhi"));
    }

    @Test
    public void testQueryAmbig() throws Exception {
        AuthAPI.forceRegister("longzhi", "0");
        AuthAPI.forceRegister("fei", "1");
        AuthAPI.forceRegister("longzhi2", "2");
        var data = publicQuery("longzhi");
        assert data.size() == 2;
        assert data.get(0).equals(new UserPublicQueryDTO(1, "longzhi"));
        assert data.get(1).equals(new UserPublicQueryDTO(3, "longzhi2"));
    }

    @Test
    public void testQueryNone() throws Exception {
        AuthAPI.forceRegister("longzhi", "0");
        var data = publicQuery("fei");
        assert data.isEmpty();
    }
}
