package com.sustech.groupup.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RunArgs {
    @Value("${env.on-k8s}")
    public boolean onK8s;

    @Value("${server.port}")
    public int port;
}
