package com.sustech.groupup.services.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.entity.db.QueryStatus;
import com.sustech.groupup.exception.InternalException;
import com.sustech.groupup.mapper.QueryMapper;
import com.sustech.groupup.services.QueryService;
import com.sustech.groupup.services.VectorService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class QueryServiceImpl implements QueryService {

    private final QueryMapper queryMapper;
    private final VectorService vectorService;

    @Override
    public void createQuery(QueryEntity queryEntity) throws JsonProcessingException {
        queryMapper.insert(queryEntity);
    }

    @Override
    public QueryEntity getQueryById(long id) {
        return queryMapper.selectById(id);
    }

    @Override
    public void updateQuery(QueryEntity queryEntity) throws JsonProcessingException {
        queryMapper.updateById(queryEntity);
    }

    @Override
    public void deleteQueryById(long id) throws JsonProcessingException {
        var query = queryMapper.selectById(id);
        vectorService.deleteVector(query.getMemberId(), query.getSurveyId());
        queryMapper.deleteById(id);
    }

    @Override
    public void updateStatusByQueryId(long id, int status) {
        QueryEntity entity = queryMapper.selectById(id);
        if (entity.getStatus() == QueryStatus.EDITING && status == QueryStatus.DONE.getValue()) {
            try {
                vectorService.updateVector(entity.getId(), entity.getUpdateAt());
            } catch (Exception e) {
                throw new InternalException("update-vector-error", e);
            }
        }
        queryMapper.updateStatusById(id, status);
    }

    @Override
    public IPage<QueryEntity> getQueryList(Long surveyId, int pageSize, int pageNo,
                                           String queryOwner) {
        QueryWrapper<QueryEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("survey_id", surveyId);
        Page<QueryEntity> page = new Page<>(pageNo, pageSize == -1 ? Long.MAX_VALUE : pageSize);
        return queryMapper.selectPage(page, queryWrapper);
    }

    @Override
    public void deletQueryBySurveyId(long id) {
        queryMapper.deleteBySurveyId(id);
    }

    @Override
    public Long getQueryIdByMemberIdAndSurveyId(long memberId, long surveyId) {
        return queryMapper.getQueryIdByMemberIdAndSurveyId(memberId, surveyId);
    }
}
