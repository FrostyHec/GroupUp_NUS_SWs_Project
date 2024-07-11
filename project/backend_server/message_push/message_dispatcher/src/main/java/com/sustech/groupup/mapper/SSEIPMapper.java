package com.sustech.groupup.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.sustech.groupup.entity.MessageDTO;

@Mapper
public interface SSEIPMapper {

    @Select("select ")
    String findSSEIP(MessageDTO msg);
}
