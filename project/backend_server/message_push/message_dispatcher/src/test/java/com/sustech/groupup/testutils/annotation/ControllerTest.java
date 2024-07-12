package com.sustech.groupup.testutils.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.testutils.TestConstant;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@MapperScan({Constant.MAPPER_SCAN_PACKAGE, TestConstant.MAPPER_SCAN_PACKAGE})
@AutoConfigureMockMvc
@TestStateImmutable
public @interface ControllerTest {

}
