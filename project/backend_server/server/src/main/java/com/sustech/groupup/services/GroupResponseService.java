package com.sustech.groupup.services;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sustech.groupup.entity.db.GroupResponseEntity;

import java.util.List;

public interface GroupResponseService {
    void createResponse(GroupResponseEntity responseEntity);
    void updateResponse(GroupResponseEntity responseEntity);
    IPage<GroupResponseEntity> getAllResponsesByUserId(int pageSize, int pageNo, Long groupId);
    Long getResponseIdByRequestIdAndUserId(Long requestId, Long userId);
}
