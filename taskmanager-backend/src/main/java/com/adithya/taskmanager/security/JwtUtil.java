package com.adithya.taskmanager.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {

   
    private static final String SECRET = "mysecretkeyformyapp12345678901234567890"; // >= 256 bits
    private static final long EXPIRATION_TIME = TimeUnit.DAYS.toMillis(1); // 1 day
    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) throws JwtException {
        return getClaims(token).getSubject();
    }

    public Date extractExpiration(String token) throws JwtException {
        return getClaims(token).getExpiration();
    }

    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            final Claims claims = getClaims(token);
            final String username = claims.getSubject();
            final boolean isTokenExpired = claims.getExpiration().before(new Date());
            
            return (username.equals(userDetails.getUsername()) && !isTokenExpired);
        } catch (JwtException e) {
            return false;
        }
    }

    private Claims getClaims(String token) throws JwtException {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Helper method to check if token is about to expire (for refresh token logic)
    public boolean isTokenExpiringSoon(String token) {
        try {
            Date expiration = extractExpiration(token);
            long timeLeft = expiration.getTime() - System.currentTimeMillis();
            return timeLeft < TimeUnit.MINUTES.toMillis(30); // 30 minutes threshold
        } catch (JwtException e) {
            return true;
        }
    }
}