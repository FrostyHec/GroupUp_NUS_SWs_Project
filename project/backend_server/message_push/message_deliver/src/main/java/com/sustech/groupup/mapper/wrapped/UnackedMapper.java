package com.sustech.groupup.mapper.wrapped;

import java.util.List;

import org.apache.ibatis.executor.BatchResult;

import com.sustech.groupup.annotation.DynamicTableNameMapper;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.handler.DynamicTableNameType;
import com.sustech.groupup.mapper.MessageRawMapper;

import lombok.RequiredArgsConstructor;

//TODO  find ways for fixing the annotation failure

@DynamicTableNameMapper(type = DynamicTableNameType.MESSAGE_DTO, name = "unacked")
@RequiredArgsConstructor
public class UnackedMapper {
    private final MessageRawMapper mapper;
    public List<SingleMessageDTO> selectByToId(long uid) {
        return mapper.selectByToId(uid);
    }

    public List<BatchResult> insert(List<SingleMessageDTO> requiredAckList) {
        return mapper.insert(requiredAckList);
    }

    public int insert(SingleMessageDTO dto){
        return mapper.insert(dto);
    }

    public int deleteByIds(List<SingleMessageDTO> unposeds) {
        return mapper.deleteByIds(unposeds);
    }
}
