package com.sustech.groupup.entity.converter;

import com.sustech.groupup.entity.api.GroupWithMemberDTO;
import com.sustech.groupup.entity.db.GroupEntity;
import com.sustech.groupup.mapper.GroupMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupInfoConverter {
    private final GroupMapper groupMapper;
    public GroupWithMemberDTO toDTO(GroupEntity groupEntity) {
        GroupWithMemberDTO dto = new GroupWithMemberDTO();
        dto.setId(groupEntity.getId());
        dto.setGroupMember(groupMapper.getMembersByGroupId(groupEntity.getId()));
        return dto;
    }
}
