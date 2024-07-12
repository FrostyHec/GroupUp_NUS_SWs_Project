package com.sustech.groupup.services.impl;

import com.sustech.groupup.entity.db.GroupResponseEntity;
import com.sustech.groupup.mapper.GroupResponseMapper;
import com.sustech.groupup.services.GroupResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupResponseServiceImpl implements GroupResponseService {
    private final GroupResponseMapper groupResponseMapper;
    @Override
    public void createResponse(GroupResponseEntity responseEntity) {
        groupResponseMapper.insert(responseEntity);
    }
}
