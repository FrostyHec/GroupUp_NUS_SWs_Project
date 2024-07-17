package com.sustech.groupup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Base64;

import com.sustech.groupup.exception.InternalException;
import com.sustech.groupup.service.CacheService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Base64;

public class RedisCacheService implements CacheService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Value("${caches.redis-channel}")
    public String CACHE_KEY;

    @Override
    public void save(String key, byte[] file) {
        try {
            String encodedFile = Base64.getEncoder().encodeToString(file);
            redisTemplate.opsForHash().put(CACHE_KEY, key, encodedFile);
        } catch (Exception e) {
            throw new RuntimeException("cache-error", e);
        }
    }

    @Override
    public byte[] get(String key) {
        String encodedFile = (String) redisTemplate.opsForHash().get(CACHE_KEY, key);
        if (StringUtils.isEmpty(encodedFile)) {
            return null;
        }
        return Base64.getDecoder().decode(encodedFile);
    }

    @Override
    public void remove(String key) {
        redisTemplate.opsForHash().delete(CACHE_KEY, key);
    }
}


