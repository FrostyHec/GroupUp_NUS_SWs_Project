package com.sustech.groupup.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.api.ResponseDTO;
import com.sustech.groupup.entity.db.GroupResponseEntity;

import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface GroupResponseMapper extends BaseMapper<GroupResponseEntity> {

    @Select("select response_group_request.response_type from response_group_request where " +
            "request_id=#{requestId}")
    List<GroupResponseEntity> getGroupResponseByRequestId(Long requestId);

    @Select("select id from response_group_request where request_id=#{requestId} and " +
            "user_id=#{userId}")
    Long getResponseIdByRequestIdAndUserId(Long requestId, Long userId);

    @Select("""
            <script>
            with request_response as (
                select sp.id, rq.from_id,rq.survey_id,sp.create_at,sp.update_at,rq.message,sp.response_type,sp.request_id
                from response_group_request sp
                         join request_grouping rq on sp.request_id=rq.id
                where sp.user_id = #{userId} and sp.response_type=0
            ),add_personal_info as(
                select personal_info,rr.id,from_id,rr.survey_id,rr.create_at,rr.update_at,message,rr.request_id,
                       response_type from
                    request_response rr
                        join query q on rr
                                            .survey_id = q.survey_id
                where q.member_id = rr.from_id
            )
               ,add_survey_name as (
                select u.username,personal_info,rr.id,from_id,rr.survey_id,rr.create_at,rr.update_at,rr.request_id,
                       message,
                       response_type from add_personal_info rr
                                              join user_table u on u.id=rr.from_id
            )select s.name, rr.username,rr.personal_info,rr.request_id id,from_id,rr.survey_id,rr.create_at,rr.update_at,
                    message,
                    response_type from add_survey_name rr
            join survey s on rr.survey_id=s.id
                <if test="pageSize != -1">
                    limit #{pageSize} offset (#{pageNo}-1)*#{pageSize}
                </if>
            </script>
            """)
    List<ResponseDTO> getResponseDTOById(int pageSize, int pageNo, Long userId);

    @Select("""
            select count(*)
            from response_group_request sp
            where sp.user_id=#{userId} and sp.response_type=0;
            """)
    int getResponseDTOSizeById(Long userId);

    @Select("""
            select request_id from response_group_request where id=#{id}
            """
    )
    int getRequestIdByResponseId(Long id);
}
