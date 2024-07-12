package com.sustech.groupup.service;

import org.junit.platform.commons.util.StringUtils;
import org.springframework.stereotype.Service;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.mapper.UnackedMapper;
import com.sustech.groupup.mapper.UnposedMapper;
import com.sustech.groupup.mapper.SSEIPMapper;
import com.sustech.groupup.outerapi.MessageDeliver;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageDispatchService {
    private final SSEIPMapper sseipMapper;
    private final UnposedMapper unposedMapper;
    private final UnackedMapper unackedMapper;
    private final MessageDeliver messageDeliver;
    public long push(SingleMessageDTO msg) {
        String ip = sseipMapper.findSSEIP(msg);
        if(StringUtils.isBlank(ip)){//没有这个sse连接
            switch (msg.getType()){
                case NEW -> {
                    msg.setMessageId(null);
                    unposedMapper.insert(msg);
                }
                case UPDATE ->{
                    //如果在unposed则更新,如果在unacked则删除unacked,放置入unposed
                    unposedMapper.insertOrUpdate(msg);
                    unackedMapper.deleteIfExists(msg);
                }
                case DELETE -> {
                    //如果在unposed则删除,如果在unacked则删除unacked
                    unposedMapper.deleteById(msg);
                    unackedMapper.deleteIfExists(msg);
                }
            }
            return msg.getMessageId();
        }
        //调用这个ip把消息发给pusher
        return messageDeliver.pushMessage(ip,msg);
    }

    public void ack(long mid) {
        unackedMapper.deleteById(mid);
    }
}
