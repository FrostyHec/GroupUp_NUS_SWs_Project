package com.sustech.groupup.services.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sustech.groupup.entity.api.GroupWithMemberDTO;
import com.sustech.groupup.entity.converter.GroupInfoConverter;
import com.sustech.groupup.entity.db.GroupEntity;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.mapper.GroupMapper;
import com.sustech.groupup.services.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupMapper groupMapper;
    private final GroupInfoConverter groupInfoConverter;

    @Override
    public List<Long> getMembersByGroupId(Long id) {
        return groupMapper.getMembersByGroupId(id);
    }

    @Override
    public int getMembersCountByGroupId(Long id) {
        return groupMapper.getMemberCountByGroupId(id);
    }

    @Override
    public void deleteGroupById(Long id) {
        groupMapper.deleteById(id);
        groupMapper.deleteAllMembersByGroupId(id);
    }

    @Override
    public void deleteGroupMemberByGroupIdAndMemberId(Long groupId, Long memberId) {
        groupMapper.deleteMemberByGroupIdAndMemberId(groupId, memberId);
    }

    @Override
    public void addGroupMember(Long groupId, Long memberId) {
        groupMapper.insertMemberByGroupId(groupId, memberId);
    }

    @Override
    public void createGroup(GroupEntity groupEntity) {
        groupMapper.insert(groupEntity);
    }

    @Override
    public IPage<GroupWithMemberDTO> getGroupList(int pageNo, int pageSize, Long surveyId) {
        QueryWrapper<GroupEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("survey_id", surveyId);
        IPage<GroupEntity> groupEntityIPage= groupMapper.selectPage(new Page<>(pageNo, pageSize == -1? Long.MAX_VALUE:pageSize), queryWrapper);
        List<GroupWithMemberDTO> groupWithMemberDTOList=new ArrayList<>();
        for (GroupEntity groupEntity : groupEntityIPage.getRecords()) {
            GroupWithMemberDTO groupWithMemberDTO = groupInfoConverter.toDTO(groupEntity);
            groupWithMemberDTOList.add(groupWithMemberDTO);
        }
        IPage<GroupWithMemberDTO> groupWithMemberDTOIPage = new Page<>(pageNo, pageSize);
        groupWithMemberDTOIPage.setRecords(groupWithMemberDTOList);
        groupWithMemberDTOIPage.setTotal(groupEntityIPage.getTotal());
        return groupWithMemberDTOIPage;
    }


}
