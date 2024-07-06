package com.example.demo.mapper;

import com.example.demo.entity.Query;
import org.apache.ibatis.annotations.*;
import java.util.List;

public interface QueryMapper {
    @Select("SELECT * FROM \"Query\" WHERE id = #{id}")
    Query getQueryById(int id);

    @Select("SELECT * FROM \"Query\"")
    List<Query> getAllQueries();

    @Insert("INSERT INTO \"Query\"(state, temp_id, info) VALUES(#{state}, #{tempId}, #{info})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertQuery(Query query);

    @Update("UPDATE \"Query\" SET state = #{state}, temp_id = #{tempId}, info = #{info} WHERE id = #{id}")
    void updateQuery(Query query);

}
