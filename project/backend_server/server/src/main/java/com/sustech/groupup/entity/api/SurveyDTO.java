package com.sustech.groupup.entity.api;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyDTO {

    private String name;
    private String description;
    private Timestamp createAt;
    private Timestamp updateAt;

 //   @JsonToStringField
    private JsonNode personalInfo;//json

//    @JsonToStringField
    private JsonNode questions;//json

    private JsonNode restriction;

    private List<Long> owners;
    private List<Long> members;
}
