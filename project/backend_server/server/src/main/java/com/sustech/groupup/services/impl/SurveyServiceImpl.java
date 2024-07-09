package com.sustech.groupup.services.impl;

import com.sustech.groupup.entity.db.SurveyEntity;
import com.sustech.groupup.mapper.SurveyMapper;
import com.sustech.groupup.services.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {
    private final SurveyMapper surveyMapper;

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
    public void updateSurvey(SurveyEntity survey, List<Long> ownerIds, List<Long> memberIds) {
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

}
