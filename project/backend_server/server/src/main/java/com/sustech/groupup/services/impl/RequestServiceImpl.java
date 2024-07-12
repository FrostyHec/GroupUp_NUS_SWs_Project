package com.sustech.groupup.services.impl;

import com.sustech.groupup.entity.db.GroupResponseEntity;
import com.sustech.groupup.entity.db.RequestEntity;
import com.sustech.groupup.mapper.GroupMapper;
import com.sustech.groupup.mapper.GroupResponseMapper;
import com.sustech.groupup.mapper.RequestMapper;
import com.sustech.groupup.mapper.UserMapper;
import com.sustech.groupup.services.GroupResponseService;
import com.sustech.groupup.services.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {
    private final RequestMapper requestMapper;
    private final GroupResponseMapper groupResponseMapper;
    @Override
    public void createRequest(RequestEntity requestEntity) {
        requestMapper.insert(requestEntity);
    }

    @Override
    public RequestEntity getRequestById(Long id) {
       return requestMapper.selectById(id);
    }

    @Override
    public int getRequestStatus(RequestEntity requestEntity) {
        List<GroupResponseEntity> responseEntityList=groupResponseMapper.getGroupResponseByRequestId(requestEntity.getId());
        for(GroupResponseEntity responseEntity:responseEntityList){
            if (!responseEntity.isResponseType()) return 2;
        }
        return 1;
    }

    @Override
    public void updateRequest(RequestEntity requestEntity) {
        requestMapper.updateById(requestEntity);
    }
}
