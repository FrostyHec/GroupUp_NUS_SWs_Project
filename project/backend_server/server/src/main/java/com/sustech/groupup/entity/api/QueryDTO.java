package com.sustech.groupup.entity.api;

import com.sustech.groupup.annotation.JsonToStringField;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryDTO {
    private String createAt;
    private String updateAt;

    @JsonToStringField
    private String personalInfo;//json

    @JsonToStringField
    private String questionsAnswer;//json
}
