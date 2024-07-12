package com.sustech.groupup.testcode.controller;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.MessagePacketDTO;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.entity.MessageType;
import com.sustech.groupup.entity.PushDTO;
import com.sustech.groupup.entity.PushType;
import com.sustech.groupup.testutils.JsonUtils;
import com.sustech.groupup.testutils.RespChecker;
import com.sustech.groupup.testutils.entity.UserEntity;
import com.sustech.groupup.testutils.mapper.UserMapper;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class API {

    //@Autowired
    //private UserMapper mapper;
    //@Autowired
    //private WebClient.Builder webClientBuilder;
    //@Autowired
    //private MockMvc mockMvc;
    //@Autowired
    //private ObjectMapper objectMapper;

    private final UserMapper mapper;
    private final WebClient.Builder webClientBuilder;
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;
    private final String deliverIp = "localhost:7076";

    public long addUser(String name) {
        var user = new UserEntity(null, name, "");
        mapper.insert(user);
        return user.getId();
    }

    public Flux<Response> register(long id) {
        WebClient webClient = webClientBuilder.baseUrl("http://" + deliverIp).build();

        return webClient.get()
                           .uri(Constant.API_VERSION + "/sse/register/" + id)
                           .retrieve()
                           .onStatus(HttpStatusCode::isError, response -> {
                               // 处理错误状态
                               return Mono.error(new RuntimeException(
                                       "Failed to connect: " + response));
                           })
                           .bodyToFlux(Response.class);
    }


    public ResultActions push(SingleMessageDTO dto) throws Exception {
        String requestBody = objectMapper.writeValueAsString(dto);
        String baseUrl = Constant.API_VERSION + "/msg_push";
        return mockMvc.perform(MockMvcRequestBuilders.post(baseUrl)
                                                     .contentType(MediaType.APPLICATION_JSON)
                                                     .content(requestBody)
                                                     .accept(MediaType.APPLICATION_JSON));

    }

    public long pushSuccess(SingleMessageDTO dto) throws Exception {
        var res = push(dto)
                .andExpect(RespChecker.success())
                .andReturn();
        return JsonUtils.toJsonData(res).get("mid").asLong();
    }

    public ResultActions ack(long mid) throws Exception {
        String baseUrl = Constant.API_VERSION + "/msg_push/ack/" + mid;
        return mockMvc.perform(MockMvcRequestBuilders.get(baseUrl)
                                                     .accept(MediaType.APPLICATION_JSON));

    }

    public void ackSuccess(long mid) throws Exception {
        ack(mid)
                .andExpect(RespChecker.success());
    }

    public SingleMessageDTO getSimpleNewMessage(long toId, boolean requiredAck) {
        var dto = new SingleMessageDTO();
        dto.setToId(toId);
        dto.setRequiredAck(requiredAck);
        dto.setType(MessageType.NEW);
        Map<String, String> map = Map.of("msg", "this is testing message");
        dto.setBody(objectMapper.valueToTree(map));
        return dto;
    }

    public SingleMessageDTO getSimpleNewMessage(long toId, boolean requiredAck, String msg) {
        var dto = new SingleMessageDTO();
        dto.setToId(toId);
        dto.setRequiredAck(requiredAck);
        dto.setType(MessageType.NEW);
        Map<String, String> map = Map.of("msg", msg);
        dto.setBody(objectMapper.valueToTree(map));
        return dto;
    }

    public void checkMessage(SingleMessageDTO rcvd, SingleMessageDTO expected, Long mid,
                             MessageType type) {
        if (mid == null) {
            assert Objects.equals(rcvd.getMessageId(), expected.getMessageId());
        } else {
            assert Objects.equals(rcvd.getMessageId(), mid);
        }
        assert Objects.equals(rcvd.getFromId(), expected.getFromId());
        assert Objects.equals(rcvd.getToId(), expected.getToId());
        if (type == null) {
            assert Objects.equals(rcvd.getType(), expected.getType());
        } else {
            assert Objects.equals(rcvd.getType(), type);
        }
        assert Objects.equals(rcvd.isRequiredAck(), expected.isRequiredAck());
        assert Objects.equals(rcvd.getBody(), expected.getBody());
    }

    public SingleMessageDTO getRcvdSingleMessage(Response resp) {
        try {
            var dto = dataCast(resp.getData(), PushDTO.class);
            assert dto.getPushType() == PushType.SINGLE;
            return dataCast(dto.getBody(), SingleMessageDTO.class);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public MessagePacketDTO getRcvdPacketMessage(Response resp) {
        try {
            var dto = dataCast(resp.getData(), PushDTO.class);
            assert dto.getPushType() == PushType.PACKET;
            return dataCast(dto.getBody(), MessagePacketDTO.class);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public <T> T dataCast(Object map, Class<T> type) throws JsonProcessingException {
        JsonNode node = objectMapper.valueToTree(map);
        return objectMapper.treeToValue(node, type);
    }
}
