package com.sustech.groupup.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.db.AnnouncementEntity;
@Mapper
public interface AnnouncementMapper extends BaseMapper<AnnouncementEntity> {

    @Select("""
            select * from announcement where survey_id = #{surveyId}
            limit #{pageSize} offset (#{pageNo}-1)*#{pageSize}
            """)
    List<AnnouncementEntity> getAnnouncement(long surveyId, int pageSize, int pageNo);
}
