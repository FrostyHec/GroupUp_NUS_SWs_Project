package com.example.demo.mapper;
import com.example.demo.entity.*;
import org.apache.ibatis.annotations.*;
import java.util.List;

public interface SurveyMapper {
    @Select("SELECT * FROM \"Survey\" WHERE id = #{id}")
    Survey getSurveyById(int id);

    @Select("SELECT * FROM \"Survey\"")
    List<Survey> getAllSurveys();

    @Insert("INSERT INTO \"Survey\"(invitationCode, state, info, creator_id) VALUES(#{invitationCode}, #{state}, #{info}, #{creatorId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertSurvey(Survey survey);

    @Update("UPDATE \"Survey\" SET invitationCode = #{invitationCode}, state = #{state}, info = #{info}, creator_id = #{creatorId} WHERE id = #{id}")
    void updateSurvey(Survey survey);

    @Delete("DELETE FROM \"Survey\" WHERE id = #{id}")
    void deleteSurvey(int id);
}
