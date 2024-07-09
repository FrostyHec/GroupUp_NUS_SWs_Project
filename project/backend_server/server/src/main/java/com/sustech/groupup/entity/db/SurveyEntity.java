package com.sustech.groupup.entity.db;

import java.sql.Timestamp;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.sustech.groupup.utils.JsonStringTypeHandler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("survey")
public class SurveyEntity {

    @TableId(type = IdType.AUTO)
    private Long id;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String name;
    private String description;
    private SurveyStatus status;

    private JsonNode personalInfo;//json

    private JsonNode questions;//json

    private JsonNode groupRestriction;//json

}
