package com.sustech.groupup.testutils;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
@Component
public class JsonUtils {

    @Autowired
    private ObjectMapper injectedObjectMapper;
    private static ObjectMapper objectMapper;
    @PostConstruct
    public void init() {
        objectMapper = injectedObjectMapper;
    }
    private JsonUtils() {
    }

    public static JsonNode toJson(MvcResult result) throws UnsupportedEncodingException,
                                                           JsonProcessingException {
        return objectMapper.readTree(result.getResponse().getContentAsString());
    }
    public static JsonNode toJsonData(MvcResult result) throws UnsupportedEncodingException,
                                                               JsonProcessingException {
        return toJson(result).get("data");
    }
}
