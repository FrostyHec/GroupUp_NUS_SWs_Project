package com.sustech.groupup.entity.db;

import java.sql.Timestamp;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.sustech.groupup.utils.JsonStringTypeHandler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user_table")
public class SurveyEntity {

    @TableId(type = IdType.AUTO)
    private long id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String name;
    private String description;
    private SurveyStatus status;

    @TableField(typeHandler = JsonStringTypeHandler.class)
    private String personalInfo;//json

    @TableField(typeHandler = JsonStringTypeHandler.class)
    private String questions;//json

    @TableField(typeHandler = JacksonTypeHandler.class)
    private RestrictionEntity groupRestriction;//json

    private long creatorId;
}
