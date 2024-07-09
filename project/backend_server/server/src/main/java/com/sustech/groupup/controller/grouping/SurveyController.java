package com.sustech.groupup.controller.grouping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sustech.groupup.entity.api.SurveyDTO;
import com.sustech.groupup.entity.converter.SurveyConverter;
import com.sustech.groupup.entity.db.SurveyEntity;
import com.sustech.groupup.services.SurveyService;
import com.sustech.groupup.utils.Response;
import org.springframework.web.bind.annotation.*;

import com.sustech.groupup.config.Constant;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Constant.API_VERSION + "/survey")
@RequiredArgsConstructor
public class SurveyController {
    private final SurveyService surveyService;
    private final SurveyConverter surveyConverter;

    @GetMapping("/{number}")
    public Response getSurveyInfoById (@PathVariable long number) throws JsonProcessingException {
        var resp = surveyConverter.toDTO(surveyService.getSurveyById(number));
        return Response.getSuccess("success",resp);
    }

    @PostMapping()
    public Response addSurvey (@RequestBody SurveyDTO surveyDTO) {
        SurveyEntity surveyEntity = surveyConverter.toEntity(surveyDTO);
        surveyService.insertSurvey(surveyEntity, surveyDTO.getMembers(), surveyDTO.getOwners());
        return Response.getSuccess("success",surveyEntity.getId());
    }

    @PutMapping("/{id}")
    public Response updateSurveyById (@PathVariable long id, @RequestBody SurveyDTO surveyDTO) {
        SurveyEntity surveyEntity = surveyConverter.toEntity(surveyDTO);
        surveyEntity.setId(id);
        surveyService.updateSurvey(surveyEntity, surveyDTO.getMembers(), surveyDTO.getOwners());
        return Response.getSuccess("success",surveyDTO);
    }

    @DeleteMapping("/{id}")
    public Response deleteSurveyById (@PathVariable long id) {
        surveyService.deleteSurveyById(id);
        return Response.getSuccess("success");
    }

    @PostMapping("/{id}/status")
    public Response updateSurveyStatusById (@PathVariable long id, @RequestParam int status) {
        surveyService.updateStatusBySurveyId(id,status);
        return Response.getSuccess("success","");
    }

    @GetMapping("/{id}/status")
    public Response getSurveyStatusById(@PathVariable long id) {
        SurveyEntity surveyEntity = surveyService.getSurveyById(id);
        return Response.getSuccess("success",surveyEntity.getStatus());
    }

}
