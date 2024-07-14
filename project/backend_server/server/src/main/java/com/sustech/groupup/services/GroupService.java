package com.sustech.groupup.services;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sustech.groupup.entity.api.GroupWithMemberDTO;
import com.sustech.groupup.entity.db.GroupEntity;
import com.sustech.groupup.entity.db.RequestEntity;

import java.util.List;

public interface GroupService {
    List<Long> getMembersByGroupId(Long id);
    int getMembersCountByGroupId(Long id);
    void deleteGroupById(Long id);
    void deleteGroupMemberByGroupIdAndMemberId(Long groupId, Long memberId);
    void addGroupMember(Long groupId, Long memberId);
    void createGroup(GroupEntity group);
    IPage<GroupWithMemberDTO> getGroupList(int page, int limit, Long surveyId);
    void deleteGroupMembersByGroupId(Long groupId);
}
