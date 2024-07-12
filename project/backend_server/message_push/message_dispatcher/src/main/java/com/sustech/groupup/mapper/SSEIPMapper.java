package com.sustech.groupup.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.sustech.groupup.entity.SingleMessageDTO;

@Mapper
public interface SSEIPMapper {

    @Select("select ip from user_ip where uid = #{toId}  ")
    String findSSEIP(SingleMessageDTO msg);
}
