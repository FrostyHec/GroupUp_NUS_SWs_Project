package com.sustech.groupup.mapper.wrapped;

import java.util.List;

import com.sustech.groupup.annotation.DynamicTableNameMapper;
import com.sustech.groupup.entity.MessagePacketDTO;
import com.sustech.groupup.entity.SSEIPEntity;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.handler.DynamicTableNameType;
import com.sustech.groupup.mapper.MessageRawMapper;
import com.sustech.groupup.mapper.SSEIPRawMapper;

import lombok.RequiredArgsConstructor;

//TODO  find ways for fixing the annotation failure

@DynamicTableNameMapper(type = DynamicTableNameType.MESSAGE_DTO, name = "unposed")
@RequiredArgsConstructor
public class UnposedMapper {
    private final MessageRawMapper mapper;

    public List<SingleMessageDTO> selectByToId(long uid) {
        return mapper.selectByToId(uid);
    }

    public boolean insertOrUpdate(SingleMessageDTO dto) {
        return mapper.insertOrUpdate(dto);
    }
}
