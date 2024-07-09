package com.sustech.groupup.testcode.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.entity.api.SurveyDTO;
import com.sustech.groupup.services.UserService;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class APIWrapper {

    private final MockMvc mockMvc;
    private final UserService userService;
    private final ObjectMapper objectMapper;

    public ResultActions login(String username, String password) throws Exception {
        String baseUrl = Constant.API_VERSION + "/user/public/login";
        String requestBody = String.format(
                """
                        {
                          "username": "%s",
                          "password": "%s"
                                       
                        }
                        """,
                username, password);
        return mockMvc.perform(MockMvcRequestBuilders.post(baseUrl)
                                                     .contentType(MediaType.APPLICATION_JSON)
                                                     .content(requestBody)
                                                     .accept(MediaType.APPLICATION_JSON));
    }

    public void register(String username, String password) {
        userService.register(username, password);
    }

    public LoginAuthDTO loginAndGetAuth(String username, String password) throws Exception {
        var res = login(username, password).andExpect(status().isOk())
                                           .andExpect(RespChecker.success())
                                           .andReturn();
        var jsonNode = JsonUtils.toJson(res);
        return objectMapper.treeToValue(jsonNode.get("data"), LoginAuthDTO.class);
    }

    public LoginAuthDTO templateUserLogin() throws Exception {
        String username = "username";
        String password = "password";
        return registerAndLogin(username, password);
    }

    public LoginAuthDTO registerAndLogin(String username, String password) throws Exception {
        register(username, password);
        return loginAndGetAuth(username, password);
    }

    public SurveyDTO getTemplateSurveyDTO() throws JsonProcessingException {
        return objectMapper.readValue("""
                                              {
                                                  "name": "Customer Feedback Survey",
                                                  "description": "A survey to gather customer feedback on recent purchases.",
                                                  "create_at": "2024-07-09T12:00:00Z",
                                                  "update_at": "2024-07-09T12:00:00Z",
                                                  "personal_info": {
                                                      "avatar": "required/not-required",
                                                      "name": "John Doe",
                                                      "field1": {
                                                          "label": "Field 1 Label",
                                                          "placeholder": "Enter field 1"
                                                      },
                                                      "field2": "Some data for field 2",
                                                      "field3": "Some data for field 3",
                                                      "self_info": "Some additional personal information"
                                                  },
                                                  "questions": [
                                                  {
                                                      "id": 1,
                                                      "question": "How satisfied are you with our service?",
                                                      "type": "rating"
                                                  },
                                                  {
                                                      "id": 2,
                                                      "question": "What can we improve?",
                                                      "type": "text"
                                                  }
                                                  ],
                                                  "group_restriction": {
                                                      "group_size": -1,
                                                      "customized_restriction": [
                                                          {
                                                          "type": "singleRequired",
                                                          "addition_code": "MustSame",
                                                          "field": 1
                                                          }
                                                      ]
                                                  },
                                                  "owners": [1,2,3],
                                                  "members": [4,5]
                                              }
                                              """, SurveyDTO.class);
    }

    public ResultActions createSurvey(LoginAuthDTO auth, SurveyDTO surveyDTO) throws Exception {
        String requestBody = objectMapper.writeValueAsString(surveyDTO);
        String baseUrl = Constant.API_VERSION + "/survey";
        return mockMvc.perform(MockMvcRequestBuilders.post(baseUrl)
                                                     .header("authorization",
                                                             "Bearer " + auth.getToken())
                                                     .contentType(MediaType.APPLICATION_JSON)
                                                     .content(requestBody)
                                                     .accept(MediaType.APPLICATION_JSON)
        );
    }

    public long createTemplateSurvey(LoginAuthDTO auth, List<Long> owner, List<Long> member) throws
                                                                                             Exception {
        var dto = getTemplateSurveyDTO();
        dto.setOwners(owner);
        dto.setMembers(member);
        var res = createSurvey(auth, dto)
                .andExpect(RespChecker.success())
                .andReturn();
        var json = JsonUtils.toJsonData(res);
        return json.get("survey_id").asLong();
    }

    public ResultActions createAnnouncement(long surveyID, LoginAuthDTO auth,
                                            AnnouncementDTO dto
    ) throws Exception {
        String requestBody = objectMapper.writeValueAsString(dto);
        String baseUrl = Constant.API_VERSION + "/survey/" + surveyID + "/announcement";
        return mockMvc.perform(MockMvcRequestBuilders.post(baseUrl)
                                                     .header("authorization",
                                                             "Bearer " + auth.getToken())
                                                     .contentType(MediaType.APPLICATION_JSON)
                                                     .content(requestBody)
                                                     .accept(MediaType.APPLICATION_JSON));
    }

    public long successfulCreateAnnouncement(long surveyID, LoginAuthDTO auth,
                                             AnnouncementDTO dto) throws Exception {
        var res = createAnnouncement(surveyID, auth, dto)
                .andExpect(RespChecker.success())
                .andReturn();
        return JsonUtils.toJsonData(res).get("id").asLong();
    }

    public AnnouncementDTO getTemplateAnnouncementDTO() throws Exception {
        return objectMapper.readValue("""
                                              {
                                               "title":"1234",
                                               "description":"12345",
                                               "create_at":"2024-07-09T12:00:00Z",
                                               "update_at":"2024-07-09T12:00:00Z"
                                               
                                               }
                                              """, AnnouncementDTO.class);
    }

    public ResultActions getAnnouncement(LoginAuthDTO auth, int pageSize, int pageNo) throws Exception {
        final String baseUrl = Constant.API_VERSION + "/user/" + auth.getId() + "/announcement/received";
        return mockMvc.perform(MockMvcRequestBuilders.get(baseUrl)
                                                     .header("authorization",
                                                             "Bearer " + auth.getToken())
                                       .param("page_size", String.valueOf(pageSize))
                                       .param("page_no", String.valueOf(pageNo))
                                         .accept(MediaType.APPLICATION_JSON));
    }

    public List<Long> successfulGetUserOwnAnnouncement(LoginAuthDTO auth, int pageSize, int pageNo) throws
                                                                                           Exception {
        var res = getAnnouncement(auth, pageSize, pageNo)
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
