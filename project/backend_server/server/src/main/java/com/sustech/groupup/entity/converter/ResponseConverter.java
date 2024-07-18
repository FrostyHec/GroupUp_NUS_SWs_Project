package com.sustech.groupup.entity.converter;

import org.springframework.stereotype.Component;

import com.sustech.groupup.entity.api.GroupResponseDTO;
import com.sustech.groupup.entity.api.ResponseDTO;
import com.sustech.groupup.entity.db.GroupResponseEntity;
import com.sustech.groupup.entity.db.RequestEntity;
import com.sustech.groupup.mapper.RequestMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ResponseConverter {
    private final RequestMapper requestMapper;
    public ResponseDTO toDTO(GroupResponseEntity entity) {
        ResponseDTO dto=new ResponseDTO();
        RequestEntity requestEntity=requestMapper.selectById(entity.getRequestId());
        dto.setFromId(requestEntity.getFromId());
        dto.setSurveyId(requestEntity.getSurveyId());
        dto.setCreateAt(entity.getCreateAt());
        dto.setMessage(requestEntity.getMessage());
        dto.setStatus(entity.getResponseType());
        dto.setUpdateAt(entity.getUpdateAt());
        return dto;
    }
}