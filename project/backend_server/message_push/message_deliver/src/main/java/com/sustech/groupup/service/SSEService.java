package com.sustech.groupup.service;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.sustech.groupup.config.RunArgs;
import com.sustech.groupup.entity.MessagePacketDTO;
import com.sustech.groupup.entity.PushDTO;
import com.sustech.groupup.entity.SSEIPEntity;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.exception.InternalException;
import com.sustech.groupup.mapper.wrapped.SSEIPMapper;
import com.sustech.groupup.mapper.wrapped.UnackedMapper;
import com.sustech.groupup.mapper.wrapped.UnposedMapper;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SSEService {

    private final SSEIPMapper sseipMapper;
    private final UnposedMapper unposedMapper;
    private final UnackedMapper unackedMapper;
    private final RunArgs runArgs;
    private final Map<Long, SseEmitter> clients = new ConcurrentHashMap<>();

    public SseEmitter register(long uid) {
        sseipMapper.insertOrUpdate(new SSEIPEntity(uid, getSelfIp()));//假连接优于丢失连接管理。先记录再创建
        SseEmitter emitter = new SseEmitter();
        emitter.onCompletion(() -> {
            log.info("emitter complete:" + uid);
        });
        emitter.onTimeout(() -> {
            log.warn("emitter timeout:" + uid);
        });
        clients.put(uid, emitter);
        try {
            initialSend(emitter, uid);
        } catch (Exception e) {
            throw new InternalException("unknown-internal-error", e);
        }
        log.info("connection established on uid:" + uid);
        return emitter;
    }

    private void initialSend(SseEmitter emitter, long uid) throws IOException {
        //TODO 为避免事务问题, 五秒钟后再拉取一次
        var unposeds = unposedMapper.selectByToId(uid);
        var unackeds = unackedMapper.selectByToId(uid);
        var dto = new MessagePacketDTO(unposeds, unackeds);
        sendMsg(emitter, new PushDTO(dto));
        var requiredAckList = unposeds.stream()
                                      .filter(SingleMessageDTO::isRequiredAck)
                                      .toList();
        unackedMapper.insert(requiredAckList);
        if (!unposeds.isEmpty()) {
            unposedMapper.deleteByIds(unposeds);
        }
    }

    private void sendMsg(SseEmitter emitter, PushDTO dto) throws IOException {
        emitter.send(Response.getSuccess(dto), MediaType.APPLICATION_JSON);
    }

    private void sseClosed(long uid) {
        sseipMapper.deleteById(uid);
        clients.remove(uid);
    }

    private String getSelfIp() {
        if (runArgs.onK8s) {
            return System.getenv("POD_IP");
        } else {
            try {
                return InetAddress.getLocalHost().getHostAddress()+":"+runArgs.port;
            } catch (UnknownHostException e) {
                throw new InternalException("unknown-internal-error", e);
            }
        }
    }

    private long pushError(long to, SingleMessageDTO dto, Exception e) {
        log.error("error on pushing message to user:" + to, e);
        log.warn("storing message to unposed:" + dto);
        sseClosed(to);
        unposedMapper.insertOrUpdate(dto);
        return dto.getMessageId();
    }

    public long push(SingleMessageDTO dto) {//push的msg都是unposed的
        long to = dto.getToId(), msgId;
        if (dto.getMessageId() == null) {//set msg id
            msgId = IdWorker.getId();
            dto.setMessageId(msgId);
        } else {
            msgId = dto.getMessageId();
        }

        var emitter = clients.get(to);
        try {
            assert emitter != null;
            sendMsg(emitter, new PushDTO(dto));
            if (dto.isRequiredAck()) {
                unackedMapper.insert(dto);
            }
        } catch (Exception e) {
            msgId = pushError(to, dto, e);
            if (emitter != null) {
                emitter.completeWithError(e);
            }
        }
        return msgId;
    }
}
