package com.sustech.groupup.outerapi.impl;

import java.util.Map;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.exception.InternalException;
import com.sustech.groupup.outerapi.MessageDeliver;
import com.sustech.groupup.utils.Response;
import com.sustech.groupup.utils.ResponseCodeType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageDeliverImpl implements MessageDeliver {

    private final RestTemplate restTemplate;

    private final ObjectMapper objectMapper;
    @Override
    public long pushMessage(String handlerIp, SingleMessageDTO msg) {
        String url = "http://" + handlerIp + Constant.API_VERSION + "/sse/push";
        var response = restTemplate.postForEntity(url,objectMapper.valueToTree(msg) , Response.class);
        if (response.getStatusCode() != HttpStatus.OK
            || Objects.isNull(response.getBody())
            || response.getBody().getCode() != ResponseCodeType.SUCCESS.getCode()) {
            //如果客户端取消连接,则push pod会删除sse，并将消息重新塞回unposed,所以不会有响应错误
            throw new InternalException("unknown-push-failure",
                                        new RuntimeException(response.toString()));
        }
        return ((Map<String, Long>) response.getBody().getData()).get("mid");
    }
}
