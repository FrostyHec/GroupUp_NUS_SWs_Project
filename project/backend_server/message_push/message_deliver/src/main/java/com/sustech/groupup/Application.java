package com.sustech.groupup;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.sustech.groupup.config.Constant;

@SpringBootApplication
@MapperScan(Constant.MAPPER_SCAN_PACKAGE)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
