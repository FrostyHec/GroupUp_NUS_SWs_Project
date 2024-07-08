package com.sustech.groupup.config;

import org.springframework.beans.factory.annotation.Value;

import jakarta.annotation.PostConstruct;

public class Constant {
    @Value("${jwt.auth-enable}")
    private boolean authEnabled;
    @PostConstruct
    public void init() {
        AUTH_ENABLED = authEnabled;
    }
    public static boolean AUTH_ENABLED;
    public static final String MAPPER_SCAN_PACKAGE = "com.sustech.groupup.mapper";
    private static final String API_V1 = "/api/v1";
    public static final String API_VERSION = API_V1;

}
