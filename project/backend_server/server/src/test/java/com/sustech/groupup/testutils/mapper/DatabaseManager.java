package com.sustech.groupup.testutils.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface DatabaseManager {
    @Select("""
            truncate table group_member;
            truncate table group_table;
            truncate table query;
            truncate table survey;
            truncate table survey_member;
            truncate table survey_owner;
            truncate table user_table;
            """
    )
    void clearDatabase();
    @Update("""
            alter sequence user_table_id_seq restart with 1;
            alter sequence group_table_id_seq restart with 1;
            alter sequence survey_id_seq restart with 1;
            alter sequence query_id_seq restart with 1;
            """)
    void resetAutoStart();
}
