package com.sustech.groupup.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.sustech.groupup.entity.MessageDTO;

@Mapper
public interface UnackedMapper {

    void deleteIfExists(MessageDTO msg);

    void deleteById(long mid);
}
