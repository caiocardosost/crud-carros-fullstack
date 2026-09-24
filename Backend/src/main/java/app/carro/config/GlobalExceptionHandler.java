package app.carro.config;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;


@ControllerAdvice
public class GlobalExceptionHandler {

    // TRATAMENTO DE ERROS DE VALIDATION
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handle01(MethodArgumentNotValidException ex) {

        Map<String, String> erros = new HashMap<>();

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            erros.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return new ResponseEntity<>(erros, HttpStatus.BAD_REQUEST);
    }

    // TRATAMENTO DE ERROS DE VALIDATION
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> handle02(ConstraintViolationException ex) {

        Map<String, String> erros = new HashMap<>();

        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            erros.put(
                violation.getPropertyPath().toString(),
                violation.getMessage()
            );
        }

        return new ResponseEntity<>(erros, HttpStatus.BAD_REQUEST);
    }

    // CREDENCIAIS INVÁLIDAS
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentials(BadCredentialsException ex) {

        return new ResponseEntity<>(
            "Credenciais inválidas",
            HttpStatus.UNAUTHORIZED
        );
    }
    
    // NAO AUTORIZADO
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDenied(AccessDeniedException ex) {
        return new ResponseEntity<>(
            "Acesso negado",
            HttpStatus.FORBIDDEN
        );
    }

    // DEMAIS ERROS
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handle03(Exception ex) {

        ex.printStackTrace();

        return new ResponseEntity<>(
            ex.getMessage(),
            HttpStatus.BAD_REQUEST
        );
    }
}


