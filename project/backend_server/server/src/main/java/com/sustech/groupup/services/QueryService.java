package com.sustech.groupup.services;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.entity.db.QueryStatus;

public interface QueryService {
    void createQuery(QueryEntity queryEntity);
    QueryEntity getQueryById(long id);
    void updateQuery(QueryEntity queryEntity);
    void deleteQueryById(long id);
    void updateStatusByQueryId(long id, int status);
    IPage<QueryEntity> getQueryList(Long surveyId, int pageSize, int pageNo, String queryOwner);
    void deletQueryBySurveyId(long id);
}
