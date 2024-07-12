package com.sustech.groupup.entity.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.sustech.groupup.annotation.JsonToStringField;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.image.renderable.RenderableImage;
import java.sql.Time;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryDTO {
    private Timestamp createAt;
    private Timestamp updateAt;
    private Long memberId;

    //@JsonToStringField
    private JsonNode personalInfo;//json

    //@JsonToStringField
    private JsonNode questionsAnswer;//json
}
