package com.sustech.groupup.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RunArgs {
    @Value("${jwt.auth-enable}")
    public boolean authEnabled;
}
