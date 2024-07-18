package com.sustech.groupup;

import com.sustech.groupup.config.Constant;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(Constant.MAPPER_SCAN_PACKAGE)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
