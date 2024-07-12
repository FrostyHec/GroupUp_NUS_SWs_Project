package com.sustech.groupup.services.impl;

import com.sustech.groupup.entity.db.RequestEntity;
import com.sustech.groupup.mapper.RequestMapper;
import com.sustech.groupup.services.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {
    private final RequestMapper requestMapper;
    @Override
    public void createRequest(RequestEntity requestEntity) {
        requestMapper.insert(requestEntity);
    }
}
