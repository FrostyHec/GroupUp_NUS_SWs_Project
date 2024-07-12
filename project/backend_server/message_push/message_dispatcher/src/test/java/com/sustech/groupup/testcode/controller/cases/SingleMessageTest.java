package com.sustech.groupup.testcode.controller.cases;

import java.util.Queue;
import java.util.Random;
import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.tuple.Pair;
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
import reactor.core.Disposable;
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
    private final int timeout = 10000, smallWait = 500;

    private MessagePacketDTO receivePacket(BlockingDeque<Response> flow, int timeout) throws
                                                                                      InterruptedException {
        return api.getRcvdPacketMessage(flow.poll(timeout, TimeUnit.MILLISECONDS));
    }

    private SingleMessageDTO receive(BlockingDeque<Response> flow, int timeout) throws
                                                                                InterruptedException {
        return api.getRcvdSingleMessage(flow.poll(timeout, TimeUnit.MILLISECONDS));
    }

    private Pair<BlockingDeque<Response>,Disposable> getFlow(Flux<Response> flux) {
        BlockingDeque<Response> flow = new LinkedBlockingDeque<>();
        Disposable closing = flux.subscribe(flow::add);
        return Pair.of(flow,closing);
    }

    private void checkUnposed(long mid, SingleMessageDTO msg) {
        SingleMessageDTO dbRcvd = unposedMapper.selectById(mid);
        api.checkMessage(dbRcvd, msg, mid, null);
    }

    private void checkUnacked(long mid, SingleMessageDTO msg) {
        SingleMessageDTO dbRcvd = unackedMapper.selectById(mid);
        api.checkMessage(dbRcvd, msg, mid, null);
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
        var flow = getFlow(flux).getKey();
        var msg = api.getSimpleNewMessage(uid, false);
        receivePacket(flow, timeout);
        Thread.sleep(smallWait);
        long mid = api.pushSuccess(msg);
        var rcvd = receive(flow, timeout);

        api.checkMessage(rcvd, msg, mid, MessageType.NEW);

        //StepVerifier.create(flow)
        //            .expectNext()
        //            .expectNext("event2")
        //            .expectNext("event3")
        //            .thenCancel()
        //            .verify();
    }

    @Test
    public void testUnconnectedTransmission() throws Exception {
        //先push后register
        long uid = api.addUser("longzhi");
        var msg = api.getSimpleNewMessage(uid, false);

        long mid = api.pushSuccess(msg);
        checkUnposed(mid, msg);

        var flux = api.register(uid);
        var flow = getFlow(flux).getKey();
        var initialPacket = receivePacket(flow, timeout);

        assert unposedMapper.selectById(mid) == null;
        assert initialPacket.getUnposed().size() == 1;
        var rcvd = initialPacket.getUnposed().get(0);
        api.checkMessage(rcvd, msg, mid, null);
    }

    @Test
    public void testAck() throws Exception {
        //initialized
        long uid = api.addUser("longzhi");
        var flux = api.register(uid);
        var flow = getFlow(flux).getKey();
        var msg = api.getSimpleNewMessage(uid, true);
        receivePacket(flow, timeout);
        Thread.sleep(smallWait);

        //push ack msg
        long mid = api.pushSuccess(msg);
        var rcvd = receive(flow, timeout);
        api.checkMessage(rcvd, msg, mid, null);
        checkUnacked(mid, msg);
        //ack
        api.ackSuccess(mid);
        assert unackedMapper.selectById(mid) == null;
    }

    @Test
    public void testDisconnectThenAck() throws Exception {
        //initialized
        long uid = api.addUser("longzhi");
        var flux = api.register(uid);
        var pair = getFlow(flux);
        var flow = pair.getKey();
        var close = pair.getRight();
        var msg = api.getSimpleNewMessage(uid, true);
        receivePacket(flow, timeout);
        Thread.sleep(smallWait);

        //push ack msg
        long mid = api.pushSuccess(msg);
        var rcvd = receive(flow, timeout);
        api.checkMessage(rcvd, msg, mid, null);
        checkUnacked(mid, msg);
        //close
        close.dispose();
        //reopen
        flux = api.register(uid);
        flow = getFlow(flux).getKey();
        rcvd = receivePacket(flow,timeout).getUnacked().get(0);
        api.checkMessage(rcvd,msg,mid,null);
        //ack
        api.ackSuccess(mid);
        Thread.sleep(smallWait);
        assert unackedMapper.selectById(mid) == null;
    }

}
