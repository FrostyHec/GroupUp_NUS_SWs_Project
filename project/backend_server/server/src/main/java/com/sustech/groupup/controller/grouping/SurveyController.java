package com.sustech.groupup.controller.grouping;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sustech.groupup.entity.api.SurveyDTO;
import com.sustech.groupup.entity.converter.SurveyConverter;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.entity.db.SurveyEntity;
import com.sustech.groupup.services.QueryService;
import com.sustech.groupup.services.SurveyService;
import com.sustech.groupup.utils.Response;
import org.springframework.web.bind.annotation.*;

import com.sustech.groupup.config.Constant;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(Constant.API_VERSION + "/survey")
@RequiredArgsConstructor
public class SurveyController {
    private final SurveyService surveyService;
    private final QueryService queryService;
    private final SurveyConverter surveyConverter;

    @GetMapping("/{number}")
    public Response getSurveyInfoById (@PathVariable long number) throws JsonProcessingException {
        var resp = surveyConverter.toDTO(surveyService.getSurveyById(number));
        return Response.getSuccess("success",Map.of("info",resp));
    }

    @PostMapping()
    public Response addSurvey (@RequestBody SurveyDTO surveyDTO) {
        SurveyEntity surveyEntity = surveyConverter.toEntity(surveyDTO);
        surveyService.insertSurvey(surveyEntity, surveyDTO.getOwners(),surveyDTO.getMembers());
        return Response.getSuccess(Map.of("survey_id", surveyEntity.getId()));
    }

    @PutMapping("/{id}")
    public Response updateSurveyById (@PathVariable long id, @RequestBody SurveyDTO surveyDTO) {
        SurveyEntity surveyEntity = surveyConverter.toEntity(surveyDTO);
        surveyEntity.setId(id);
        surveyService.updateSurvey(surveyEntity, surveyDTO.getMembers(), surveyDTO.getOwners());
        return Response.getSuccess();
    }

    @DeleteMapping("/{id}")
    public Response deleteSurveyById (@PathVariable long id) {
        surveyService.deleteSurveyById(id);
        return Response.getSuccess();
    }

    @PostMapping("/{id}/status")
    public Response updateSurveyStatusById (@PathVariable long id, @RequestParam int status) {
        surveyService.updateStatusBySurveyId(id,status);
        return Response.getSuccess();
    }

    @GetMapping("/{id}/status")
    public Response getSurveyStatusById(@PathVariable long id) {
        SurveyEntity surveyEntity = surveyService.getSurveyById(id);
        return Response.getSuccess(Map.of("status",surveyEntity.getStatus()));
    }

    @GetMapping("/{id}/allquery")
    public Response getQueryList(@PathVariable long id,
                                 @RequestParam(defaultValue = "-1") int pageSize,
                                 @RequestParam(defaultValue = "1") int pageNo,
                                 @RequestParam(defaultValue = "") String queryOwner) {
        IPage<QueryEntity> queryResult = queryService.getQueryList(id, pageSize, pageNo, queryOwner); // 调用Service层方法获取查询结果
        Map<String, Object> data = new HashMap<>();
        data.put("total_size", queryResult.getSize());
        data.put("list", queryResult.getRecords());
        return Response.getSuccess("success",data);
    }

    @DeleteMapping("/{id}/allquery")
    public Response deleteQueryBySurveyId(@PathVariable long id) {
        queryService.deletQueryBySurveyId(id);
        return Response.getSuccess("success");
    }
}
