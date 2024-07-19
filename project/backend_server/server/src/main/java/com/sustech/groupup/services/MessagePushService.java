package com.sustech.groupup.services;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustech.groupup.config.Constant;
import com.sustech.groupup.exception.InternalException;
import com.sustech.groupup.utils.Response;
import com.sustech.groupup.utils.ResponseCodeType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MessagePushService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    @Value("${spring.message-push.url}")
    private String dispatcherUrl;
    public void pushEmptyToIds(Long from_id,List<Long> toIds) {
        for(var id:toIds) {
            var msg = Map.of(
                    "from_id",from_id,"to_id",id,"type",1,
                    "required_ack",false,"body",""
            );
            var response =
                        restTemplate.postForEntity(dispatcherUrl, objectMapper.valueToTree(msg),
                                                   Response.class);

            if (response.getStatusCode() != HttpStatus.OK
                || Objects.isNull(response.getBody())
                || response.getBody().getCode() != ResponseCodeType.SUCCESS.getCode()) {
                //如果客户端取消连接,则push pod会删除sse，并将消息重新塞回unposed,所以不会有响应错误
                log.warn("unknown-push-failure");
                throw new InternalException("unknown-push-failure",
                                            new RuntimeException(response.toString()));
            }
        }
    }
}
