package com.sustech.groupup.entity.db;
import java.sql.Timestamp;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
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

    @TableField(typeHandler = JsonStringTypeHandler.class)
    private String personalInfo;//json

    @TableField(typeHandler = JsonStringTypeHandler.class)
    private String questionsAnswer;//json
}
