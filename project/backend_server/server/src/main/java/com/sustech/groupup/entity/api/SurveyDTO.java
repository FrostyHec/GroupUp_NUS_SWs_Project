package com.sustech.groupup.entity.api;

import java.util.List;

import com.sustech.groupup.annotation.JsonToStringField;
import com.sustech.groupup.entity.db.RestrictionEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyDTO {

    private String name;
    private String description;
    private String createAt;
    private String updateAt;

    @JsonToStringField
    private String personalInfo;//json

    @JsonToStringField
    private String questions;//json
    private RestrictionEntity restriction;

    private List<Long> owners;
    private List<Long> members;
}
