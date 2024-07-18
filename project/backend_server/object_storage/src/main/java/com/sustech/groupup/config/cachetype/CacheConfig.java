package com.sustech.groupup.config.cachetype;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

import com.sustech.groupup.service.CacheService;
import com.sustech.groupup.service.impl.MemCacheService;
import com.sustech.groupup.service.impl.NoCacheService;
import com.sustech.groupup.service.impl.RedisCacheService;

@Configuration
public class CacheConfig {

    @Bean
    @Conditional(RedisCacheCondition.class)
    public CacheService redisCacheService() {
        return new RedisCacheService();
    }

    @Bean
    @Conditional(MemCacheCondition.class)
    public CacheService localCacheService() {
        return new MemCacheService();
    }

    @Bean
    @Conditional(NoCacheCondition.class)
    public CacheService noCacheService() {
        return new NoCacheService();
    }
}
