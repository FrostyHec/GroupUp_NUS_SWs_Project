package com.sustech.groupup.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.baomidou.mybatisplus.autoconfigure.ConfigurationCustomizer;
import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.fasterxml.jackson.databind.JsonNode;
import com.sustech.groupup.handler.JsonNodeTypeHandler;

@Configuration
@MapperScan("com.sustech.groupup.mapper")
public class MyBatisPlusConfig {

    @Bean
    public ConfigurationCustomizer mybatisConfigurationCustomizer() {
        return new ConfigurationCustomizer() {
            @Override
            public void customize(MybatisConfiguration configuration) {
                configuration.getTypeHandlerRegistry().register(JsonNode.class, JsonNodeTypeHandler.class);
            }
        };
    }
}
