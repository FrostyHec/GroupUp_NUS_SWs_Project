package com.sustech.groupup.services;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.entity.db.QueryStatus;

public interface QueryService {
    void createQuery(QueryEntity queryEntity) throws JsonProcessingException;
    QueryEntity getQueryById(long id);
    void updateQuery(QueryEntity queryEntity) throws JsonProcessingException;
    void deleteQueryById(long id) throws JsonProcessingException;
    void updateStatusByQueryId(long id, int status);
    IPage<QueryEntity> getQueryList(Long surveyId, int pageSize, int pageNo, String queryOwner);
    void deletQueryBySurveyId(long id);
    Long getQueryIdByMemberIdAndSurveyId(long memberId, long surveyId);
}
