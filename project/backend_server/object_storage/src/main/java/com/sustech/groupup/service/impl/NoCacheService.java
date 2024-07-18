package com.sustech.groupup.service.impl;

import java.io.File;

import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartFile;

import com.sustech.groupup.service.CacheService;

public class NoCacheService implements CacheService {

    @Override
    public void save(String key, byte[] file) {

    }

    @Override
    public byte[] get(String key) {
        return null;
    }

    @Override
    public void remove(String key) {

    }
}
