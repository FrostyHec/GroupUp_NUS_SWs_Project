package com.sustech.groupup.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RunArgs {
    @Value("${caches.size}")
    public int cacheSize;
}
