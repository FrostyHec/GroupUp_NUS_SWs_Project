package com.sustech.groupup.testutils.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface DatabaseManager {
    @Select("""
            truncate table user_table;
            truncate table user_ip;
            truncate table msg_unacked;
            truncate table msg_unposed;
            """
    )
    void clearDatabase();
    @Update("""
            alter sequence user_table_id_seq restart with 1;
            """)
    void resetAutoStart();
}
