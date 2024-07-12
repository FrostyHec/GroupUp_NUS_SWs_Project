package com.sustech.groupup.entity.converter;

import com.sustech.groupup.entity.api.RequestDTO;
import com.sustech.groupup.entity.db.RequestEntity;
import com.sustech.groupup.services.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RequestConverter {
    private final GroupService groupService;
    public RequestEntity toEntity(RequestDTO dto) {
        RequestEntity entity = new RequestEntity();
        entity.setFromId(dto.getFromId());
        entity.setToGroup(dto.isToGroup());
        entity.setToId(dto.getToId());
        entity.setCreateAt(dto.getCreateAt());
        entity.setMessage(dto.getMessage());
        if(dto.isToGroup()) {
            entity.setRemainRequiredAccept(groupService.getMembersCountByGroupId(dto.getToId()));
        }
        else {
            entity.setRemainRequiredAccept(1);
        }
        entity.setStatus(0);
        return entity;
    }
}
