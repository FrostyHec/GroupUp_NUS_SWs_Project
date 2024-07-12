package com.sustech.groupup.services;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sustech.groupup.entity.db.RequestEntity;

public interface RequestService {
    void createRequest(RequestEntity requestEntity);
    RequestEntity getRequestById(Long id);
    int getRequestStatus(RequestEntity requestEntity);
    void updateRequest(RequestEntity requestEntity);
    IPage<RequestEntity> getRequestListByFromId(Long fromId,int pageNo, int pageSize);
}
