package com.sustech.groupup.entity.converter;

import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.entity.db.AnnouncementEntity;

public class AnnouncementConverter {
    public static AnnouncementDTO toDTO(AnnouncementEntity entity) {
        AnnouncementDTO dto = new AnnouncementDTO();
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setCreateAt(entity.getCreateAt());
        dto.setUpdateAt(entity.getUpdateAt());
        return dto;
    }
    public static AnnouncementEntity toEntity(Long surveyID,AnnouncementDTO dto) {
        AnnouncementEntity entity = new AnnouncementEntity();
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setCreateAt(dto.getCreateAt());
        entity.setUpdateAt(dto.getUpdateAt());

        //special
        entity.setId(null);
        entity.setSurveyId(surveyID);
        return entity;
    }
}
