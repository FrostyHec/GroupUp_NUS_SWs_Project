package com.sustech.groupup.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.db.QueryEntity;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

public interface QueryMapper extends BaseMapper<QueryEntity> {
    @Update("update query set status = #{newStatus} where id = #{queryId}")
    void updateStatusById(@Param("queryId") Long SurveyId, @Param("newStatus") int newStatus);
}
