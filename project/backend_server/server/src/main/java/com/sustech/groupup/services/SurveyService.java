package com.sustech.groupup.services;

import com.sustech.groupup.entity.db.SurveyEntity;

import java.util.List;

public interface SurveyService {
    SurveyEntity getSurveyById(long id);
    List<Long> getOwnerIdBySurveyId(long surveyId);
    List<Long> getMemberIdBySurveyId(long surveyId);
    void insertSurvey(SurveyEntity survey, List<Long> memberIds, List<Long> ownerIds);
    void updateSurvey(SurveyEntity survey, List<Long> memberIds, List<Long> ownerIds);
    void updateStatusBySurveyId(long surveyId, int status);
    void deleteSurveyById(long surveyId);
    int getSurveyMembersCount(long surveyId);
    int getSurveyGroupsCount(long surveyId);
    int getSurveyAnswersCount(long surveyId);
    int getSurveyGroupedMembersCount(long surveyId);
}
