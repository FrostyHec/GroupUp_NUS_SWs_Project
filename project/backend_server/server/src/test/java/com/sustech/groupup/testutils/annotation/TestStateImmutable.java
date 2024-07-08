package com.sustech.groupup.testutils.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.junit.jupiter.api.extension.ExtendWith;

import com.sustech.groupup.testutils.EnsureTestStateImmutabilityFilterTest;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@ExtendWith(EnsureTestStateImmutabilityFilterTest.class)
public @interface TestStateImmutable {
}
