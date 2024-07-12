package com.sustech.groupup.entity.converter;

import com.sustech.groupup.entity.api.GroupResponseDTO;
import com.sustech.groupup.entity.db.GroupResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupResponseConverter {
    public GroupResponseEntity toEntity(GroupResponseDTO dto) {
        GroupResponseEntity entity = new GroupResponseEntity();
        entity.setUpdateAt(dto.getUpdateAt());
        entity.setRequestId(dto.getRequestId());
        entity.setUserId(dto.getFromId());
        entity.setResponseType(dto.isStatus());
        return entity;
    }
}
