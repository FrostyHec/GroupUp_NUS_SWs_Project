package com.sustech.groupup.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private Key key;
    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(long id) {
        return Jwts.builder()
                   .setSubject(String.valueOf(id))
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() + expiration))
                   .signWith(key, SignatureAlgorithm.HS512)
                   .compact();
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(key)
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    public boolean isTokenExpired(String token) {
        return getClaimsFromToken(token)
                .getExpiration()
                .before(new Date());
    }

    public boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public Long getSubject(String token) {
        return Long.valueOf(getClaimsFromToken(token).getSubject());
    }
}
