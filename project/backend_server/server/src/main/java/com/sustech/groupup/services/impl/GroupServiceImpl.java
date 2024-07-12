package com.sustech.groupup.services.impl;

import com.sustech.groupup.entity.db.GroupEntity;
import com.sustech.groupup.mapper.GroupMapper;
import com.sustech.groupup.services.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupMapper groupMapper;

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

}
