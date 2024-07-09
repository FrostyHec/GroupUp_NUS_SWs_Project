package com.sustech.groupup.services.impl;

import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.entity.db.QueryStatus;
import com.sustech.groupup.mapper.QueryMapper;
import com.sustech.groupup.services.QueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QueryServiceImpl implements QueryService {
    private final QueryMapper queryMapper;
    @Override
    public void createQuery(QueryEntity queryEntity) {
        queryMapper.insert(queryEntity);
    }

    @Override
    public QueryEntity getQueryById(long id) {
        return queryMapper.selectById(id);
    }

    @Override
    public void updateQuery(QueryEntity queryEntity) {
        queryMapper.updateById(queryEntity);
    }

    @Override
    public void deleteQueryById(long id) {
        queryMapper.deleteById(id);
    }

    @Override
    public void updateStatusByQueryId(long id, int status) {
        queryMapper.updateStatusById(id, status);
    }
}
