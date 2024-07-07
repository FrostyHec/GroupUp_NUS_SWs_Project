package com.sustech.groupup.testutils.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface DatabaseManager {
    @Select("TRUNCATE TABLE users;")
    void clearDatabase();
}
