package com.sustech.groupup.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.db.SurveyEntity;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface SurveyMapper extends BaseMapper<SurveyEntity> {

    @Select("select survey_owner.owner_id from survey_owner where survey_id= #{surveyId}")
    List<Long> getOwnerIdBySurveyId(@Param("surveyId") Long SurveyId);

    @Select("select survey_member.member_id from survey_member where survey_id= #{surveyId}")
    List<Long> getMemberIdBySurveyId(@Param("surveyId") Long SurveyId);

    @Update("update survey set status = #{newStatus} where id = #{surveyId}")
    void updateStatusById(@Param("surveyId") Long SurveyId, @Param("newStatus") int newStatus);

    @Select("""
            <script>
                    select * from survey_owner where owner_id = #{id}
                    <if test="pageSize != -1">
                        limit #{pageSize} offset (#{pageNo}-1)*#{pageSize}
                    </if>
            </script>
            """)
    List<Long> queryOwnSurvey(int id, int pageSize, int pageNo);

    @Select("""
            <script>
                    select * from survey_member where member_id = #{id}
                    <if test="pageSize != -1">
                        limit #{pageSize} offset (#{pageNo}-1)*#{pageSize}
                    </if>
            </script>
            """)
    List<Long> queryParticipateSurvey(int id, int pageSize, int pageNo);

    @Insert("insert into survey_member (member_id, survey_id) VALUES (#{member_id}, #{survey_id})")
    void insertSurveyMember(@Param("member_id") Long MemberId, @Param("survey_id") Long SurveyId);

    @Insert("insert into survey_owner (owner_id, survey_id) VALUES (#{owner_id}, #{survey_id})")
    void insertSurveyOwner(@Param("owner_id") Long OwnerId, @Param("survey_id") Long SurveyId);

    @Delete("delete from survey_owner where survey_id= #{survey_id}")
    void deleteSurveyOwnerById(@Param("survey_id") Long SurveyId);

    @Delete("delete from survey_member where survey_id= #{survey_id}")
    void deleteSurveyMemberById(@Param("survey_id") Long SurveyId);

    @Select("""
            select (select true from survey_owner where owner_id = #{requestUserId} and survey_id = #{surveyId} limit 1) is not null
            """)
    boolean isOwner(long surveyId, long requestUserId);

    @Select("""
             select (select true from survey_member where member_id = #{requestUserId} and survey_id = #{surveyId} limit 1) is not null
            """)
    boolean isMember(long surveyId, long requestUserId);

    default boolean isAccessable(long surveyId, long requestUserId) {
        return isOwner(surveyId, requestUserId) || isMember(surveyId, requestUserId);
    }
}
