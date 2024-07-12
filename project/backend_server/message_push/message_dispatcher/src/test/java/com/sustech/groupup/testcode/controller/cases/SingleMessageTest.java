package com.sustech.groupup.testcode.controller.cases;

import java.util.Queue;
import java.util.Random;
import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.sustech.groupup.entity.MessagePacketDTO;
import com.sustech.groupup.entity.MessageType;
import com.sustech.groupup.entity.SingleMessageDTO;
import com.sustech.groupup.mapper.UnackedMapper;
import com.sustech.groupup.mapper.UnposedMapper;
import com.sustech.groupup.testcode.controller.API;
import com.sustech.groupup.testutils.annotation.ControllerTest;
import com.sustech.groupup.testutils.mapper.UserMapper;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

@ControllerTest
public class SingleMessageTest {

    @Autowired
    private API api;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UnackedMapper unackedMapper;
    @Autowired
    private UnposedMapper unposedMapper;
    private MessagePacketDTO receivePacket(BlockingDeque<Response> flow, int timeout) throws
                                                                          InterruptedException {
         return api.getRcvdPacketMessage(flow.poll(timeout, TimeUnit.SECONDS));
    }

    private SingleMessageDTO receive(BlockingDeque<Response> flow, int timeout) throws
                                                                                InterruptedException {
        return api.getRcvdSingleMessage(flow.poll(timeout, TimeUnit.SECONDS));
    }
    public BlockingDeque<Response> getFlow(Flux<Response> flux){
        BlockingDeque<Response> flow = new LinkedBlockingDeque<>();
        flux.subscribe(flow::add);
        return flow;
    }
    @Test
    public void testNoConnection() throws Exception {
        long uid = api.addUser("longzhi");
        var msg = api.getSimpleNewMessage(uid, false);
        long mid = api.pushSuccess(msg);
        SingleMessageDTO dbRcvd = unposedMapper.selectById(mid);
        api.checkMessage(dbRcvd, msg, mid, null);
    }

    @Test
    public void testNoConnectionMultipleSend() throws Exception {
        long uid = api.addUser("longzhi");
        Random random = new Random();
        for (int i = 0; i < 100; i++) {
            var msg = api.getSimpleNewMessage(uid, false, String.valueOf(random.nextDouble()));
            long mid = api.pushSuccess(msg);
            SingleMessageDTO dbRcvd = unposedMapper.selectById(mid);
            api.checkMessage(dbRcvd, msg, mid, null);
        }
    }

    @Test
    public void testNormalTransmission() throws Exception {
        long uid = api.addUser("longzhi");
        var flux = api.register(uid);
        var flow = getFlow(flux);
        var msg = api.getSimpleNewMessage(uid, true);
        receivePacket(flow, 500);
        Thread.sleep(500);
        long mid = api.pushSuccess(msg);
        var rcvd = receive(flow, 500);

        api.checkMessage(rcvd, msg, mid, MessageType.NEW);

        //StepVerifier.create(flow)
        //            .expectNext()
        //            .expectNext("event2")
        //            .expectNext("event3")
        //            .thenCancel()
        //            .verify();
    }
}
