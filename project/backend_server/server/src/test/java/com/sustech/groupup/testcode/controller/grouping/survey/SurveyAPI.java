package com.sustech.groupup.testcode.controller.grouping.survey;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.entity.api.SurveyDTO;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SurveyAPI {
    protected final MockMvc mockMvc;
    private final ObjectMapper objectMapper;
    public ResultActions create(LoginAuthDTO auth, SurveyDTO surveyDTO) throws Exception {
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

    public long successfulCreate(LoginAuthDTO auth,
                                 SurveyDTO dto) throws Exception {
        var res = create(auth, dto)
                .andExpect(RespChecker.success())
                .andReturn();
        return JsonUtils.toJsonData(res).get("survey_id").asLong();
    }

    public long successfulCreateTemplate(LoginAuthDTO auth, List<Long> owner, List<Long> member) throws
                                                                                             Exception {
        var dto = getTemplateDTO();
        dto.setOwners(owner);
        dto.setMembers(member);
        return successfulCreate(auth,dto);
    }

    public SurveyDTO getTemplateDTO() throws JsonProcessingException {
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
}
