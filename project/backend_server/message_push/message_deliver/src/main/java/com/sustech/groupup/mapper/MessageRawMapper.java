package com.sustech.groupup.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.annotation.DynamicTableNameMapper;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.handler.DynamicTableNameType;
@Mapper
public interface MessageRawMapper extends BaseMapper<SingleMessageDTO> {

    @Select("select * from msg where to_id=#{toId} ")
    List<SingleMessageDTO> selectByToId(long toId);
}
