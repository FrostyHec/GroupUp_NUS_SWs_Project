package com.sustech.groupup.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.db.SurveyEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface SurveyMapper extends BaseMapper<SurveyEntity> {

    @Select("select survey_owner.owner_id from survey_owner where survey_id= #{surveyId}")
    List<Long> getOwnerIdBySurveyId (@Param("surveyId") Long SurveyId);

    @Select("select survey_member.member_id from survey_member where survey_id= #{surveyId}")
    List<Long> getMemberIdBySurveyId (@Param("surveyId") Long SurveyId);

    @Update("update survey set status = #{newStatus} where id = #{surveyId}")
    void updateStatusById(@Param("surveyId") Long SurveyId, @Param("newStatus") int newStatus);
}
