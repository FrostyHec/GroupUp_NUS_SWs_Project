package com.sustech.groupup.service.impl;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.sustech.groupup.config.RunArgs;
import com.sustech.groupup.service.CacheService;
import com.sustech.groupup.utils.LRUCache;

import jakarta.annotation.PostConstruct;

public class MemCacheService implements CacheService {
    @Autowired
    private RunArgs args;
    private LRUCache<String,byte[]> cache;

    @PostConstruct
    private void init(){
        cache = new LRUCache<>(args.cacheSize);
    }
    public void save(String key,byte[] file){
        cache.put(key,file);
    }
    public byte[] get(String key){
        if(!cache.containsKey(key)){
            return null;
        }
        return cache.get(key);
    }
    public void remove(String key){
        cache.remove(key);
    }
}

