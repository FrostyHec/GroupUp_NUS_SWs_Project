package com.sustech.groupup.entity.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupWithMemberDTO {
    private Long group_id;
    private List<Long> member_ids;
}
