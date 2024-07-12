package com.sustech.groupup.services;

import com.sustech.groupup.entity.db.RequestEntity;

public interface RequestService {
    void createRequest(RequestEntity requestEntity);
    RequestEntity getRequestById(Long id);
    int getRequestStatus(RequestEntity requestEntity);
    void updateRequest(RequestEntity requestEntity);
}
