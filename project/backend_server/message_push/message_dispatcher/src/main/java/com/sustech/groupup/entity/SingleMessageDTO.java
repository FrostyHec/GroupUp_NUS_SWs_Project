package com.sustech.groupup.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "msg_unposed")
public class SingleMessageDTO {
    // if msg type is new, the messageId field will be ignored for creation
    @TableId(type = IdType.ASSIGN_ID)
    private Long messageId;

    private long fromId;
    private long toId;
    private MessageType type;
    private boolean requiredAck;
    private JsonNode body;
}
