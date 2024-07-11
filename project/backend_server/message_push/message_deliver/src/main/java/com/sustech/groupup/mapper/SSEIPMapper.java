package com.sustech.groupup.mapper;

import org.apache.ibatis.annotations.Select;

import com.sustech.groupup.annotation.DynamicTableNameMapper;

@DynamicTableNameMapper
public interface SSEIPMapper {

    @Select("insert into user_ip(uid, ip) values (#{uid},#{selfIp})")
    void insert(long uid, String selfIp);

    @Select("delete from user_ip where uid=#{uid}")
    void remove(long uid);
}
