package com.sustech.groupup.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.sustech.groupup.entity.SingleMessageDTO;

@Mapper
public interface UnackedMapper {

    void deleteIfExists(SingleMessageDTO msg);

    void deleteById(long mid);
}
