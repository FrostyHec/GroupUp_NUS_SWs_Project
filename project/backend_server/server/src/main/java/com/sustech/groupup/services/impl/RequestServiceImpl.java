package com.sustech.groupup.services.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sustech.groupup.entity.db.GroupResponseEntity;
import com.sustech.groupup.entity.db.RequestEntity;
import com.sustech.groupup.mapper.GroupResponseMapper;
import com.sustech.groupup.mapper.RequestMapper;
import com.sustech.groupup.services.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public RequestEntity getRequestById(Long id) {
        var rqid = groupResponseMapper.getRequestIdByResponseId(id);
       return requestMapper.selectById(rqid);
    }

    @Override
    public int getRequestStatus(RequestEntity requestEntity) {
        List<GroupResponseEntity> responseEntityList=groupResponseMapper.getGroupResponseByRequestId(requestEntity.getId());
        for(GroupResponseEntity responseEntity:responseEntityList){
            if (responseEntity.getResponseType()==2) return 2;
        }
        return 1;
    }

    @Override
    public void updateRequest(RequestEntity requestEntity) {
        requestMapper.updateById(requestEntity);
    }

    @Override
    public IPage<RequestEntity> getRequestListByFromId(Long fromId, int pageSize, int pageNo) {
        QueryWrapper<RequestEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("from_id", fromId);
        Page<RequestEntity> page = new Page<>(pageNo, pageSize== -1 ? Long.MAX_VALUE : pageSize);
        return requestMapper.selectPage(page,queryWrapper);
    }
}
