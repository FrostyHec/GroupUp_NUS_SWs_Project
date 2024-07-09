package com.sustech.groupup.entity.db;
import java.sql.Timestamp;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.databind.JsonNode;
import com.sustech.groupup.utils.JsonStringTypeHandler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("query")
public class QueryEntity {
    @TableId(type = IdType.AUTO)
    private Long id;
    private QueryStatus status;

    private Timestamp createAt;
    private Timestamp updateAt;

    private long surveyId;
    private long memberId;

    private JsonNode personalInfo;//json

    private JsonNode questionsAnswer;//json
}
