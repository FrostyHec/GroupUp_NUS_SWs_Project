package com.sustech.groupup.handler;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.sustech.groupup.annotation.DynamicTableNameMapper;

@Aspect
@Component
public class DynamicNameAspect {

    @Before("within(@com.sustech.groupup.annotation.DynamicTableNameMapper *)")
    //@Before("execution(* com.sustech.groupup.mapper..*.*(..)) && within(@com.sustech.groupup.annotation" +
    //        ".DynamicTableNameMapper *)")
    //@Before("execution(* com.baomidou.mybatisplus.core.mapper.BaseMapper.*(..)) " +
    //        "&& within(@com.sustech.groupup.annotation.DynamicTableNameMapper *)")
    //@Before("execution(* com.baomidou.mybatisplus.core.mapper.BaseMapper+.*(..))" +
    //        " && @target(com.sustech.groupup.annotation.DynamicTableNameMapper)")
    //@Before("execution(* com.baomidou.mybatisplus.core.mapper.BaseMapper+.*(..))")
    public void setTableName(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Class<?> clazz = signature.getDeclaringType();
        DynamicTableNameMapper annotation = clazz.getAnnotation(DynamicTableNameMapper.class);

        switch (annotation.type()) {
            case NO -> {
                DynamicMapNameHelper.setDefault();
            }
            case MESSAGE_DTO -> {
                DynamicMapNameHelper.setMessageDTO(annotation.name());
            }
        }
    }
}
