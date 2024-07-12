package com.sustech.groupup.services.impl;

import com.sustech.groupup.entity.db.GroupResponseEntity;
import com.sustech.groupup.mapper.GroupResponseMapper;
import com.sustech.groupup.services.GroupResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupResponseServiceImpl implements GroupResponseService {
    private final GroupResponseMapper groupResponseMapper;
    @Override
    public void createResponse(GroupResponseEntity responseEntity) {
        groupResponseMapper.insert(responseEntity);
    }

    @Override
    public List<GroupResponseEntity> getAllResponsesByGroupId(Long groupId) {
        return groupResponseMapper.getGroupResponseByRequestId(groupId);
    }
}
