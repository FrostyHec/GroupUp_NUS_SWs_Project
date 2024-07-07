package com.sustech.groupup.mapper;

//public interface GroupMapper {
//    @Select("SELECT * FROM \"Group\" WHERE id = #{id}")
//    @Results({
//            @Result(property = "id", column = "id"),
//            @Result(property = "state", column = "state"),
//            @Result(property = "surveyId", column = "survey_id"),
//            @Result(property = "members", column = "id",
//                    many = @Many(select = "com.example.demo.mapper.UserMapper.findUsersByGroupId"))
//    })
//    GroupEntity getGroupById(int id);
//
//    @Select("SELECT * FROM \"Group\"")
//    @Results({
//            @Result(property = "id", column = "id"),
//            @Result(property = "state", column = "state"),
//            @Result(property = "surveyId", column = "survey_id"),
//            @Result(property = "members", column = "id",
//                    many = @Many(select = "com.example.demo.mapper.UserMapper.findUsersByGroupId"))
//    })
//    List<GroupEntity> getAllGroups();
//
//    @Insert("INSERT INTO \"Group\"(state, survey_id) VALUES(#{state}, #{surveyId})")
//    @Options(useGeneratedKeys = true, keyProperty = "id")
//    void insertGroup(GroupEntity group);
//
//    @Update("UPDATE \"Group\" SET state = #{state}, survey_id = #{surveyId} WHERE id = #{id}")
//    void updateGroup(GroupEntity group);
//
//    @Delete("DELETE FROM \"Group\" WHERE id = #{id}")
//    void deleteGroup(int id);
//
//    @Insert("INSERT INTO \"Group_Member\"(group_id, user_id) VALUES(#{groupId}, #{userId})")
//    void insertGroupMember(@Param("groupId") int groupId, @Param("userId") int userId);
//
//    @Delete("DELETE FROM \"Group_Member\" WHERE group_id = #{groupId} AND user_id = #{userId}")
//    void deleteGroupMember(@Param("groupId") int groupId, @Param("userId") int userId);
//}
