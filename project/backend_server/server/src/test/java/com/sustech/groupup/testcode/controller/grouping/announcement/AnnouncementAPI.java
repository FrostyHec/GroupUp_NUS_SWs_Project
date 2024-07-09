package com.sustech.groupup.testcode.controller.grouping.announcement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;

import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class AnnouncementAPI {
    protected final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    public ResultActions create(long surveyID, LoginAuthDTO auth,
                                AnnouncementDTO dto) throws Exception {
        String requestBody = objectMapper.writeValueAsString(dto);
        String baseUrl = Constant.API_VERSION + "/survey/" + surveyID + "/announcement";
        return mockMvc.perform(MockMvcRequestBuilders.post(baseUrl)
                                                     .header("authorization",
                                                             "Bearer " + auth.getToken())
                                                     .contentType(MediaType.APPLICATION_JSON)
                                                     .content(requestBody)
                                                     .accept(MediaType.APPLICATION_JSON));
    }

    public long successfulCreate(long surveyID, LoginAuthDTO auth,
                                 AnnouncementDTO dto) throws Exception {
        var res = create(surveyID, auth, dto)
                .andExpect(RespChecker.success())
                .andReturn();
        return JsonUtils.toJsonData(res).get("id").asLong();
    }

    public AnnouncementDTO getTemplateDTO() throws Exception {
        return objectMapper.readValue("""
                                              {
                                               "title":"1234",
                                               "description":"12345",
                                               "create_at":"2024-07-09T12:00:00Z",
                                               "update_at":"2024-07-09T12:00:00Z"
                                               
                                               }
                                              """, AnnouncementDTO.class);
    }

    public ResultActions getByUser(LoginAuthDTO auth, int pageSize, int pageNo) throws Exception {
        final String baseUrl = Constant.API_VERSION + "/user/" + auth.getId() + "/announcement/received";
        return mockMvc.perform(MockMvcRequestBuilders.get(baseUrl)
                                                     .header("authorization",
                                                             "Bearer " + auth.getToken())
                                                     .param("page_size", String.valueOf(pageSize))
                                                     .param("page_no", String.valueOf(pageNo))
                                                     .accept(MediaType.APPLICATION_JSON));
    }

    public List<Long> successfulGetByUser(LoginAuthDTO auth, int pageSize, int pageNo) throws
                                                                                                    Exception {
        var res = getByUser(auth, pageSize, pageNo)
                .andExpect(RespChecker.success())
                .andReturn();
        List<Long> ans = new ArrayList<>();
        var li = JsonUtils.toJsonData(res).get("ids");
        assert li.isArray();
        for (var i : li) {
            ans.add(i.asLong());
        }
        return ans;
    }
}
