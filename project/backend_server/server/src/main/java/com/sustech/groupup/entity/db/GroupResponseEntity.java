package com.sustech.groupup.entity.db;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor

@TableName("response_group_request")
public class GroupResponseEntity {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Timestamp updateAt;
    private Long requestId;
    private Long userId;
    private boolean responseType;
}
