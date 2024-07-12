package com.sustech.groupup.mapper.wrapped;

import com.sustech.groupup.annotation.DynamicTableNameMapper;
import com.sustech.groupup.entity.SSEIPEntity;
import com.sustech.groupup.mapper.SSEIPRawMapper;

import lombok.RequiredArgsConstructor;

//TODO  find ways for fixing the annotation failure
@DynamicTableNameMapper
@RequiredArgsConstructor
public class SSEIPMapper{
    private final SSEIPRawMapper mapper;

    public boolean insertOrUpdate(SSEIPEntity sseipEntity) {
        return mapper.insertOrUpdate(sseipEntity);
    }

    public int deleteById(long uid) {
        return mapper.deleteById(uid);
    }
}
