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
    public Response getQueryById (@PathVariable long number) {
        var resp = queryConverter.toDTO(queryService.getQueryById(number));
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
    public Response updateQueryById (@PathVariable long number, @RequestBody QueryDTO queryDTO) {
        QueryEntity queryEntity = queryConverter.toEntity(queryDTO);
        queryEntity.setId(number);
        queryService.updateQuery(queryEntity);
        return Response.getSuccess("success",Map.of("query",queryDTO));
    }

    @DeleteMapping("/{number}")
    public Response deleteQueryById (@PathVariable long number) {
        queryService.deleteQueryById(number);
        return Response.getSuccess("success");
    }

    @PutMapping("/{number}/status")
    public Response updateSurveyStatusById (@PathVariable long number, @RequestParam int status) {
        queryService.updateStatusByQueryId(number,status);
        return Response.getSuccess("success","");
    }

    @GetMapping("/{number}/status")
    public Response getQueryStatusById(@PathVariable long number) {
        QueryEntity queryEntity = queryService.getQueryById(number);
        return Response.getSuccess("success",Map.of("status",queryEntity.getStatus()));
    }

}
