package com.sustech.groupup.services.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sustech.groupup.entity.api.ResponseDTO;
import com.sustech.groupup.entity.db.GroupResponseEntity;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.mapper.GroupResponseMapper;
import com.sustech.groupup.services.GroupResponseService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void updateResponse(GroupResponseEntity responseEntity) {
        groupResponseMapper.updateById(responseEntity);
    }

    @Override
    @Transactional
    public IPage<ResponseDTO> getAllResponsesByUserId(int pageSize, int pageNo, Long userId) {
        //QueryWrapper<GroupResponseEntity> queryWrapper = new QueryWrapper<>();
        //queryWrapper.eq("user_id", userId);
        //Page<GroupResponseEntity> page = new Page<>(pageNo, pageSize== -1 ? Long.MAX_VALUE :
        // pageSize);
        //return groupResponseMapper.selectPage(page,queryWrapper);
        assert userId != null;
        IPage<ResponseDTO> res = new Page<>();
        var size = groupResponseMapper.getResponseDTOSizeById(userId);
        var li = groupResponseMapper.getResponseDTOById(pageSize, pageNo, userId);
        res.setTotal(size);
        res.setRecords(li);
        return res;
    }

    @Override
    public Long getResponseIdByRequestIdAndUserId(Long requestId, Long userId) {
        return groupResponseMapper.getResponseIdByRequestIdAndUserId(requestId, userId);
    }

}
