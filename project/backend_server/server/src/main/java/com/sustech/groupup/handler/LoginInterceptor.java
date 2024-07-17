package com.sustech.groupup.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.sustech.groupup.exception.ExternalException;
import com.sustech.groupup.utils.JwtUtil;
import com.sustech.groupup.utils.Response;
@Slf4j
@Component
@RequiredArgsConstructor
public class LoginInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request,
                             @NonNull HttpServletResponse response,
                             @NonNull Object handler) {
        log.info("auth verifying request :{}",request);
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")){
            throwUnauthorizedException("no-auth");
        }
        token = token.substring(7);
        try {
            if (!jwtUtil.validateToken(token)) {
                throwUnauthorizedException("auth-expired");
            }
        }catch (Exception e){
            log.warn("auth-invalid:"+token,e);
            throwUnauthorizedException("invalid-auth");
        }
        Long userId = jwtUtil.getSubject(token);
        request.setAttribute("request_user_id", userId);
        return true;
    }

    private void throwUnauthorizedException(String msg) {
        log.warn("auth verification failed");
        throw new ExternalException(Response.getUnauthorized(msg));
    }
}
