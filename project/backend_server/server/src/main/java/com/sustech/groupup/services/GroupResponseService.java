package com.sustech.groupup.services;

import com.sustech.groupup.entity.db.GroupResponseEntity;

import java.util.List;

public interface GroupResponseService {
    void createResponse(GroupResponseEntity responseEntity);
    List<GroupResponseEntity> getAllResponsesByGroupId(Long groupId);
}
