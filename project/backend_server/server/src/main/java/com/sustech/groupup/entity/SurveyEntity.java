package com.sustech.groupup.entity;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyEntity {
    private int id;
    private String invitationCode;
    private Map<String, String> info;
    private int creatorId;
    private String state;
}
