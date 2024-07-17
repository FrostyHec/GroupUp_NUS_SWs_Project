package com.sustech.groupup.services;

import java.sql.Timestamp;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.msg_api.VectorMessageAddDTO;
import com.sustech.groupup.entity.msg_api.VectorMessageDeleteDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VectorService {

    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    public void updateVector(long queryId, Timestamp update_time) throws JsonProcessingException {
        VectorMessageAddDTO message = new VectorMessageAddDTO(queryId, update_time);
        String jsonMessage = objectMapper.writeValueAsString(message);
        rabbitTemplate.convertAndSend(Constant.VECTOR_QUEUE, jsonMessage);
    }

    public void deleteVector(long memberId, long surveyId) throws JsonProcessingException {
        VectorMessageDeleteDTO msg = new VectorMessageDeleteDTO(memberId, surveyId);
        String jsonMessage = objectMapper.writeValueAsString(msg);
        rabbitTemplate.convertAndSend(Constant.VECTOR_QUEUE, jsonMessage);
    }
}
