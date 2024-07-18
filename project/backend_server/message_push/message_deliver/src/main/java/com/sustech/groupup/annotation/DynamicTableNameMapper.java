
package com.sustech.groupup.annotation;
//TODO  find ways for fixing the annotation failure for basedMapper api
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.sustech.groupup.handler.DynamicTableNameType;
@Component
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface DynamicTableNameMapper {
    DynamicTableNameType type() default DynamicTableNameType.NO;
    String name() default "";
}
