package com.sustech.groupup.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sustech.groupup.handler.LoginInterceptor;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class InterceptorConfig implements WebMvcConfigurer {

    private final LoginInterceptor loginInterceptor;
    @Bean
    public LoginInterceptor getLoginInterceptor() {
        return this.loginInterceptor;
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 鉴权拦截器
        registry.addInterceptor(loginInterceptor)
                .excludePathPatterns("/**/public/**");
    }

}