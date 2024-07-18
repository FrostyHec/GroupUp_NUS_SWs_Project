package com.sustech.groupup.entity.db;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.lang.reflect.Type;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("request_grouping")
public class RequestEntity {

    @TableId(type = IdType.AUTO)
    private Long id;

    private long surveyId;
    private Long fromId;
    private boolean toGroup;
    private Long toId;
    private Timestamp createAt;
    private String message;
    private int remainRequiredAccept;
    private int status; //0 for wait, 1 for accept, 2 for reject
}
