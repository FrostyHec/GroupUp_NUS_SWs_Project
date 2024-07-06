package com.example.demo.mapper;

import com.example.demo.entity.Group;
import org.apache.ibatis.annotations.*;
import java.util.List;


public interface GroupMapper {
    @Select("SELECT * FROM \"Group\" WHERE id = #{id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "state", column = "state"),
            @Result(property = "surveyId", column = "survey_id"),
            @Result(property = "members", column = "id",
                    many = @Many(select = "com.example.demo.mapper.UserMapper.findUsersByGroupId"))
    })
    Group getGroupById(int id);

    @Select("SELECT * FROM \"Group\"")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "state", column = "state"),
            @Result(property = "surveyId", column = "survey_id"),
            @Result(property = "members", column = "id",
                    many = @Many(select = "com.example.demo.mapper.UserMapper.findUsersByGroupId"))
    })
    List<Group> getAllGroups();

    @Insert("INSERT INTO \"Group\"(state, survey_id) VALUES(#{state}, #{surveyId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertGroup(Group group);

    @Update("UPDATE \"Group\" SET state = #{state}, survey_id = #{surveyId} WHERE id = #{id}")
    void updateGroup(Group group);

    @Delete("DELETE FROM \"Group\" WHERE id = #{id}")
    void deleteGroup(int id);

    @Insert("INSERT INTO \"Group_Member\"(group_id, user_id) VALUES(#{groupId}, #{userId})")
    void insertGroupMember(@Param("groupId") int groupId, @Param("userId") int userId);

    @Delete("DELETE FROM \"Group_Member\" WHERE group_id = #{groupId} AND user_id = #{userId}")
    void deleteGroupMember(@Param("groupId") int groupId, @Param("userId") int userId);
}
