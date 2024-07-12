package com.sustech.groupup.controller.grouping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.RequestDTO;
import com.sustech.groupup.entity.converter.RequestConverter;
import com.sustech.groupup.entity.db.RequestEntity;
import com.sustech.groupup.mapper.GroupMapper;
import com.sustech.groupup.services.GroupService;
import com.sustech.groupup.services.RequestService;
import com.sustech.groupup.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(Constant.API_VERSION + "/survey/{id}/group")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;
    private final RequestService requestService;
    private final RequestConverter requestConverter;

    @GetMapping("/{number}")
    public Response getGroupMemberListById (@PathVariable long number) {
        Map<String,Object> response = new HashMap<>();
        List<Long> memberIds = groupService.getMembersByGroupId(number);
        response.put("group_id", number);
        response.put("member_id", memberIds);
        return Response.getSuccess("success", response);
    }

    @PostMapping("/requestgroup")
    public Response requestgroup (@RequestBody RequestDTO requestDTO) {
        RequestEntity requestEntity=requestConverter.toEntity(requestDTO);
        requestService.createRequest(requestEntity);
        return Response.getSuccess("success", Map.of("request_id:" ,requestEntity.getId()));
    }

    @DeleteMapping("/leavegroup")
    public Response leavegroup (@RequestBody JsonNode request) {
        Long groupId = request.get("to_group").asLong();
        Long memberId = request.get("from_id").asLong();
        groupService.deleteGroupMemberByGroupIdAndMemberId(groupId,memberId);
        if (groupService.getMembersCountByGroupId(groupId)==1){
            groupService.deleteGroupById(groupId);
        }
        return Response.getSuccess("success","");
    }
}
