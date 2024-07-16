package com.sustech.groupup.controller.grouping;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sustech.groupup.entity.api.QueryDTO;
import com.sustech.groupup.entity.api.SurveyDTO;
import com.sustech.groupup.entity.converter.QueryConverter;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.entity.db.SurveyEntity;
import com.sustech.groupup.services.QueryService;
import com.sustech.groupup.utils.Response;
import org.springframework.web.bind.annotation.*;

import com.sustech.groupup.config.Constant;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(Constant.API_VERSION + "/survey/{surveyId}/query")
@RequiredArgsConstructor
public class QueryController {
    private final QueryConverter queryConverter;
    private final QueryService queryService;

    @GetMapping("/{number}")
    public Response getQueryByUserId (@PathVariable long number,@PathVariable int surveyId) {
        long queryId=queryService.getQueryIdByMemberIdAndSurveyId(number,surveyId);
        var resp = queryConverter.toDTO(queryService.getQueryById(queryId));
        return Response.getSuccess("success",Map.of("query",resp));
    }

    @PostMapping()
    public Response addQuery (@PathVariable long surveyId ,@RequestBody QueryDTO queryDTO) {
        QueryEntity queryEntity = queryConverter.toEntity(queryDTO);
        queryEntity.setSurveyId(surveyId);
        queryService.createQuery(queryEntity);
        return Response.getSuccess("success",Map.of("id",(queryEntity.getId())));
    }

    @PutMapping("/{number}")
    public Response updateQueryByUserId (@PathVariable long number, @PathVariable long surveyId,@RequestBody QueryDTO queryDTO) {
        QueryEntity queryEntity = queryConverter.toEntity(queryDTO);
        long queryId = queryService.getQueryIdByMemberIdAndSurveyId(number,surveyId);
        queryEntity.setId(queryId);
        queryService.updateQuery(queryEntity);
        return Response.getSuccess("success",Map.of("query",queryDTO));
    }

    @DeleteMapping("/{number}")
    public Response deleteQueryByUserId (@PathVariable long number,@PathVariable long surveyId) {
        long queryId=queryService.getQueryIdByMemberIdAndSurveyId(number,surveyId);
        queryService.deleteQueryById(queryId);
        return Response.getSuccess("success");
    }

    @PutMapping("/{number}/status")
    public Response updateSurveyStatusById (@PathVariable long number,@PathVariable long surveyId, @RequestParam int status) {
        long queryId=queryService.getQueryIdByMemberIdAndSurveyId(number,surveyId);
        queryService.updateStatusByQueryId(queryId,status);
        return Response.getSuccess("success","");
    }

    @GetMapping("/{number}/status")
    public Response getQueryStatusById(@PathVariable long number,@PathVariable long surveyId) {
        long queryId=queryService.getQueryIdByMemberIdAndSurveyId(number,surveyId);
        QueryEntity queryEntity = queryService.getQueryById(queryId);
        return Response.getSuccess("success",Map.of("status",queryEntity.getStatus()));
    }

//    @GetMapping("/user/{id}")
//    public Response getQueryIdByMemberId(@PathVariable long surveyId,@PathVariable long id) {
//        Long queryId=queryService.getQueryIdByMemberIdAndSurveyId(id,surveyId);
//        return Response.getSuccess("success",Map.of("queryId",queryId));
//    }
}
