package com.ssafy.aptCom.common.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler({ExpiredJwtException.class, SignatureException.class, MalformedJwtException.class})
    @ExceptionHandler({ExpiredJwtException.class})
    public ResponseEntity<?> handleInvalidJwtException(final Exception e) {

        String msg = "Invalid JWT exception [" + e.getMessage() + "]";
        log.error(msg);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

}
