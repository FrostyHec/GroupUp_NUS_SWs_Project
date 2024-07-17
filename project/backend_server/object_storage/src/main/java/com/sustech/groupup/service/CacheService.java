package com.sustech.groupup.service;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface CacheService {
    void save(String key, byte[] file);
    byte[] get(String key); // may return null if no cache
    void remove(String key);
}
