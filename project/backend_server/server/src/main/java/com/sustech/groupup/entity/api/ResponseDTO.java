package com.sustech.groupup.entity.api;

import java.sql.Timestamp;

import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {
    private Long id;
    private JsonNode personalInfo;
    private long fromId;
    private String userName;
    private long surveyId;
    private String surveyName;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String message;
    private int status;
}
