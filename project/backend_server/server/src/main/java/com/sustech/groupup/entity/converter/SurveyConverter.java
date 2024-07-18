package com.sustech.groupup.entity.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.entity.api.SurveyDTO;
import com.sustech.groupup.entity.db.SurveyEntity;
import com.sustech.groupup.entity.db.SurveyStatus;
import com.sustech.groupup.services.SurveyService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SurveyConverter {

    private final SurveyService surveyService;

    public SurveyDTO toDTO(SurveyEntity surveyEntity) {

        SurveyDTO surveyDTO = new SurveyDTO();
        surveyDTO.setId(surveyEntity.getId());
        surveyDTO.setName(surveyEntity.getName());
        surveyDTO.setDescription(surveyEntity.getDescription());
        surveyDTO.setCreateAt(surveyEntity.getCreateAt());
        surveyDTO.setUpdateAt(surveyEntity.getUpdateAt());
        surveyDTO.setPersonalInfo(surveyEntity.getPersonalInfo());
        surveyDTO.setQuestions(surveyEntity.getQuestions());

        surveyDTO.setGroupRestriction(surveyEntity.getGroupRestriction());
        surveyDTO.setOwners(surveyService.getOwnerIdBySurveyId(surveyEntity.getId()));
        surveyDTO.setMembers(surveyService.getMemberIdBySurveyId(surveyEntity.getId()));
        return surveyDTO;
    }
    public SurveyEntity toEntity(SurveyDTO surveyDTO) {
        SurveyEntity surveyEntity = new SurveyEntity();
        surveyEntity.setName(surveyDTO.getName());
        surveyEntity.setDescription(surveyDTO.getDescription());
        surveyEntity.setCreateAt(surveyDTO.getCreateAt());
        surveyEntity.setUpdateAt(surveyDTO.getUpdateAt());
        surveyEntity.setStatus(SurveyStatus.CLOSED);
        surveyEntity.setPersonalInfo(surveyDTO.getPersonalInfo());
        surveyEntity.setQuestions(surveyDTO.getQuestions());
        surveyEntity.setGroupRestriction(surveyDTO.getGroupRestriction());
        return surveyEntity;
    }

}
