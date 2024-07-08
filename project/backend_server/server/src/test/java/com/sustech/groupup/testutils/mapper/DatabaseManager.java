package com.sustech.groupup.testutils.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface DatabaseManager {
    @Select("truncate table group_member;" +
            "truncate table group_table;" +
            "truncate table query;" +
            "truncate table survey;" +
            "truncate table survey_member;" +
            "truncate table survey_owner;" +
            "truncate table user_table;"
    )
    void clearDatabase();
}
