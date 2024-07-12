package com.sustech.groupup.services;

import com.sustech.groupup.entity.db.GroupEntity;

import java.util.List;

public interface GroupService {
    List<Long> getMembersByGroupId(Long id);
    int getMembersCountByGroupId(Long id);
    void deleteGroupById(Long id);
    void deleteGroupMemberByGroupIdAndMemberId(Long groupId, Long memberId);
}
