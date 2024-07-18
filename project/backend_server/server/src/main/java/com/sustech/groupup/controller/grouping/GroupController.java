package com.sustech.groupup.controller.grouping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.GroupResponseDTO;
import com.sustech.groupup.entity.api.RequestDTO;
import com.sustech.groupup.entity.converter.GroupResponseConverter;
import com.sustech.groupup.entity.converter.RequestConverter;
import com.sustech.groupup.entity.db.GroupEntity;
import com.sustech.groupup.entity.db.GroupResponseEntity;
import com.sustech.groupup.entity.db.RequestEntity;
import com.sustech.groupup.mapper.GroupMapper;
import com.sustech.groupup.services.GroupResponseService;
import com.sustech.groupup.services.GroupService;
import com.sustech.groupup.services.MessagePushService;
import com.sustech.groupup.services.RequestService;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(Constant.API_VERSION + "/survey/{id}/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final RequestService requestService;
    private final GroupResponseService groupResponseService;
    private final RequestConverter requestConverter;
    private final GroupResponseConverter groupResponseConverter;
    private final MessagePushService messagePushService;

    @GetMapping("/{number}")
    public Response getGroupMemberListById(@PathVariable long number) {
        Map<String, Object> response = new HashMap<>();
        List<Long> memberIds = groupService.getMembersByGroupId(number);
        response.put("group_id", number);
        response.put("member_id", memberIds);
        return Response.getSuccess("success", response);
    }

    @PostMapping("/requestgroup")
    public Response requestGroup(@RequestBody RequestDTO requestDTO, @PathVariable long id) {
        RequestEntity requestEntity = requestConverter.toEntity(requestDTO);
        requestEntity.setSurveyId(id);
        requestService.createRequest(requestEntity);
        if (requestEntity.isToGroup()) {
            List<Long> memberIds = groupService.getMembersByGroupId(requestEntity.getToId());
            for (Long memberId : memberIds) {
                GroupResponseEntity groupResponseEntity = new GroupResponseEntity();
                groupResponseEntity.setCreateAt(requestEntity.getCreateAt());
                groupResponseEntity.setRequestId(requestEntity.getId());
                groupResponseEntity.setResponseType(0);
                groupResponseEntity.setUpdateAt(requestEntity.getCreateAt());
                groupResponseEntity.setUserId(memberId);
                groupResponseService.createResponse(groupResponseEntity);
            }
            messagePushService.pushEmptyToIds(requestEntity.getFromId(), memberIds);
        } else {
            GroupResponseEntity groupResponseEntity = new GroupResponseEntity();
            groupResponseEntity.setCreateAt(requestEntity.getCreateAt());
            groupResponseEntity.setRequestId(requestEntity.getId());
            groupResponseEntity.setResponseType(0);
            groupResponseEntity.setUpdateAt(requestEntity.getCreateAt());
            groupResponseEntity.setUserId(requestEntity.getToId());
            groupResponseService.createResponse(groupResponseEntity);

            messagePushService.pushEmptyToIds(requestEntity.getFromId(),
                                              List.of(requestEntity.getToId()));
        }
        return Response.getSuccess("success", Map.of("request_id", requestEntity.getId()));
    }

    @DeleteMapping("/leavegroup")
    public Response leaveGroup(@RequestBody JsonNode request) {
        Long groupId = request.get("to_group").asLong();
        Long memberId = request.get("from_id").asLong();
        groupService.deleteGroupMemberByGroupIdAndMemberId(groupId, memberId);
        if (groupService.getMembersCountByGroupId(groupId) == 1) {
            groupService.deleteGroupById(groupId);
        }
        return Response.getSuccess("success", "");
    }

    @PostMapping("/response")
    @Transactional
    public Response response(@PathVariable long id,
                             @RequestBody GroupResponseDTO groupResponseDTO) {
        GroupResponseEntity groupResponseEntity = groupResponseConverter.toEntity(groupResponseDTO);
        groupResponseEntity.setId(groupResponseService.getResponseIdByRequestIdAndUserId(
                groupResponseDTO.getRequestId(), groupResponseDTO.getUserId()));
        groupResponseService.updateResponse(groupResponseEntity);
        RequestEntity requestEntity =
                requestService.getRequestById(groupResponseEntity.getRequestId());
        requestEntity.setRemainRequiredAccept(requestEntity.getRemainRequiredAccept() - 1);
        if (requestEntity.getRemainRequiredAccept() == 0) {
            requestEntity.setStatus(requestService.getRequestStatus(requestEntity));
            if (requestEntity.getStatus() == 1) {
                if (requestEntity.isToGroup()) {
                    groupService.addGroupMember(requestEntity.getToId(), requestEntity.getFromId());
                } else {
                    GroupEntity groupEntity = new GroupEntity();
                    groupEntity.setSurveyId(id);
                    groupService.createGroup(groupEntity);
                    groupService.addGroupMember(groupEntity.getId(),
                                                groupResponseEntity.getUserId());
                    groupService.addGroupMember(groupEntity.getId(), requestEntity.getFromId());
                }
            }
        }
        requestService.updateRequest(requestEntity);
        return Response.getSuccess("success", "");
    }
}
