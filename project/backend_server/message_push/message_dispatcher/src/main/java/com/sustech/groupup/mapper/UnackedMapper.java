package com.sustech.groupup.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.sustech.groupup.entity.SingleMessageDTO;

@Mapper
public interface UnackedMapper {

    @Update("delete from msg_unacked where message_id = #{messageId} ")
    void deleteIfExists(SingleMessageDTO msg);

    @Update("delete from msg_unacked where message_id = #{mid}")
    void deleteById(long mid);

    @Select("select * from msg_unacked where message_id = #{mid}")
    SingleMessageDTO selectById(long mid);
}
