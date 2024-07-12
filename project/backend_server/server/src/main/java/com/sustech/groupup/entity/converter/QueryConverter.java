package com.sustech.groupup.entity.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.entity.api.QueryDTO;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.entity.db.QueryStatus;
import com.sustech.groupup.services.QueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class QueryConverter {
    private final QueryService queryService;
    private final ObjectMapper objectMapper;

    public QueryDTO toDTO(QueryEntity queryEntity) {
        QueryDTO queryDTO = new QueryDTO();
        queryDTO.setCreateAt(queryEntity.getCreateAt());
        queryDTO.setUpdateAt(queryEntity.getUpdateAt());
        queryDTO.setPersonalInfo(queryEntity.getPersonalInfo());
        queryDTO.setQuestionsAnswer(queryEntity.getQuestionsAnswer());
        return queryDTO;
    }
    public QueryEntity toEntity(QueryDTO queryDTO) {
        QueryEntity queryEntity = new QueryEntity();
        queryEntity.setStatus(QueryStatus.EDITING);
        queryEntity.setCreateAt(queryDTO.getCreateAt());
        queryEntity.setUpdateAt(queryDTO.getUpdateAt());
        queryEntity.setPersonalInfo(queryDTO.getPersonalInfo());
        queryEntity.setQuestionsAnswer(queryDTO.getQuestionsAnswer());
        queryEntity.setMemberId(queryDTO.getMemberId());//应该从token中获得
        return queryEntity;
    }
}
