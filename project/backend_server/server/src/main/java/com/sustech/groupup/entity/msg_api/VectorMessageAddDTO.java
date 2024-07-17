package com.sustech.groupup.entity.msg_api;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class VectorMessageAddDTO {
    private final VectorMessageType type = VectorMessageType.UPDATE;
    private long queryId;
    private Timestamp updateTime;

    public VectorMessageAddDTO(long queryId, Timestamp updateTime) {
        this.queryId = queryId;
        this.updateTime = updateTime;
    }
}
