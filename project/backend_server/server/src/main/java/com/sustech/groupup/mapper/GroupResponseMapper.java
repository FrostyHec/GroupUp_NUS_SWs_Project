package com.sustech.groupup.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.db.GroupResponseEntity;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface GroupResponseMapper extends BaseMapper<GroupResponseEntity> {
    @Select("select response_group_request.response_type from response_group_request where request_id=#{requestId}")
    List<GroupResponseEntity> getGroupResponseByRequestId(Long requestId);

    @Select("select id from response_group_request where request_id=#{requestId} and user_id=#{userId}")
    Long getResponseIdByRequestIdAndUserId(Long requestId,Long userId);

}
