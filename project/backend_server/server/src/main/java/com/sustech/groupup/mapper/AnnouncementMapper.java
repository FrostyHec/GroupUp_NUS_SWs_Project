package com.sustech.groupup.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.db.AnnouncementEntity;
@Mapper
public interface AnnouncementMapper extends BaseMapper<AnnouncementEntity> {

    @Select("""
            <script>
                select * from announcement where survey_id = #{surveyId}
                <if test="pageSize != -1">
                    limit #{pageSize} offset (#{pageNo}-1)*#{pageSize}
                </if>
            </script>
            """)
    List<AnnouncementEntity> getAnnouncementInSurvey(long surveyId, int pageSize, int pageNo);
    @Select("""
            <script>
            select id from announcement where survey_id in (
                select survey_id from survey_member
                    where member_id= #{uid}
                )
                <if test="pageSize != -1">
                    limit #{pageSize} offset (#{pageNo}-1)*#{pageSize}
                </if>
            </script>
            """)
    List<Long> getAnnouncementByUser(long uid, int pageSize, int pageNo);
}
