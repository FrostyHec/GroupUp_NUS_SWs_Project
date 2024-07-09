package com.sustech.groupup.services.impl;

import com.sustech.groupup.entity.db.SurveyEntity;
import com.sustech.groupup.mapper.SurveyMapper;
import com.sustech.groupup.services.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public void insertSurvey(SurveyEntity survey) {
        surveyMapper.insert(survey);
    }

    @Override
    public void updateSurvey(SurveyEntity survey) {
        surveyMapper.updateById(survey);
    }

    @Override
    public void updateStatusBySurveyId(long surveyId, int status) {
        surveyMapper.updateStatusById(surveyId,status);
    }

    @Override
    public void deleteSurveyById(long surveyId) {
        surveyMapper.deleteById(surveyId);
    }

    @Override
    public int getStatusBySurveyId(long surveyId) {
        return 0;
    }
}
