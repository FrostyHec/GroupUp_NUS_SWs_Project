package com.sustech.groupup.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.sustech.groupup.exception.ExternalException;
import com.sustech.groupup.utils.JwtUtil;
import com.sustech.groupup.utils.Response;
import com.sustech.groupup.utils.ResponseCodeType;

@Component
@RequiredArgsConstructor
public class LoginInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request,
                             @NonNull HttpServletResponse response,
                             @NonNull Object handler) {

        String token = request.getHeader("Authorization");
        String username = request.getHeader("username");
        if (token == null || username == null|| !token.startsWith("Bearer ")){
            throwUnauthorizedException("no-auth");
        }
        token = token.substring(7);
        if (!jwtUtil.validateToken(token, username)) {
            throwUnauthorizedException("invalid-auth");
        }
        return true;
    }

    private void throwUnauthorizedException(String msg) {
        throw new ExternalException(Response.getUnauthorized(msg));
    }
}
