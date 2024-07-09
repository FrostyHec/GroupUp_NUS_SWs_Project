package com.sustech.groupup.services;

import com.sustech.groupup.entity.db.SurveyEntity;

import java.util.List;

public interface SurveyService {
    SurveyEntity getSurveyById(long id);
    List<Long> getOwnerIdBySurveyId(long surveyId);
    List<Long> getMemberIdBySurveyId(long surveyId);
    void insertSurvey(SurveyEntity survey);
    void updateSurvey(SurveyEntity survey);
    void updateStatusBySurveyId(long surveyId, int status);
    void deleteSurveyById(long surveyId);
    int getStatusBySurveyId(long surveyId);
}
