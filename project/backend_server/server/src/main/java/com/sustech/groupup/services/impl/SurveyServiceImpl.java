package com.sustech.groupup.services.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sustech.groupup.entity.db.GroupEntity;
import com.sustech.groupup.entity.db.SurveyEntity;
import com.sustech.groupup.mapper.GroupMapper;
import com.sustech.groupup.mapper.QueryMapper;
import com.sustech.groupup.mapper.SurveyMapper;
import com.sustech.groupup.mapper.UserMapper;
import com.sustech.groupup.services.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {
    private final SurveyMapper surveyMapper;
    private final GroupMapper groupMapper;
    private final QueryMapper queryMapper;

    @Override
    public SurveyEntity getSurveyById(long id) {
        return surveyMapper.selectById(id);
    }

    @Override
    public List<Long> getOwnerIdBySurveyId(long surveyId) {
        return surveyMapper.getOwnerIdBySurveyId(surveyId);
    }

    @Override
    public List<Long> getMemberIdBySurveyId(long surveyId){
        return surveyMapper.getMemberIdBySurveyId(surveyId);
    }

    @Override
    public void insertSurvey(SurveyEntity survey, List<Long> ownerIds, List<Long> memberIds) {
        surveyMapper.insert(survey);
        for (Long ownerId : ownerIds) {
            surveyMapper.insertSurveyOwner(ownerId,survey.getId());
        }
        for (Long memberId : memberIds) {
            surveyMapper.insertSurveyMember(memberId,survey.getId());
        }
        //后续可以数据库批处理优化
    }

    @Override
    public void updateSurvey(SurveyEntity survey, List<Long> memberIds, List<Long> ownerIds) {
        surveyMapper.updateById(survey);
        surveyMapper.deleteSurveyOwnerById(survey.getId());
        for (Long ownerId : ownerIds) {
            surveyMapper.insertSurveyOwner(ownerId,survey.getId());
        }
        surveyMapper.deleteSurveyMemberById(survey.getId());
        for (Long memberId : memberIds) {
            surveyMapper.insertSurveyMember(memberId,survey.getId());
        }
        //后续可以数据库批处理优化
    }

    @Override
    public void updateStatusBySurveyId(long surveyId, int status) {
        surveyMapper.updateStatusById(surveyId,status);
    }

    @Override
    public void deleteSurveyById(long surveyId) {
        surveyMapper.deleteById(surveyId);
        surveyMapper.deleteSurveyOwnerById(surveyId);
        surveyMapper.deleteSurveyMemberById(surveyId);
    }

    @Override
    public int getSurveyMembersCount(long surveyId) {
        return surveyMapper.countSurveyMemberBySurveyId(surveyId);
    }

    @Override
    public int getSurveyGroupsCount(long surveyId) {
        return groupMapper.getGroupCountBySurveyId(surveyId);
    }

    @Override
    public int getSurveyAnswersCount(long surveyId) {
        return queryMapper.getQueryCountBySurveyId(surveyId);
    }

    @Override
    public int getSurveyGroupedMembersCount(long surveyId) {
        QueryWrapper<GroupEntity> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("survey_id", surveyId);
        int result=0;
        for (GroupEntity groupEntity : groupMapper.selectList(queryWrapper)) {
            result=result+groupMapper.getMembersCountByGroupId(groupEntity.getId());
        }
        return result;
    }

}
