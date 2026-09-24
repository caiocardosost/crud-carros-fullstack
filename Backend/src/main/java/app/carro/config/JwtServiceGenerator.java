package app.carro.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import app.carro.auth.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtServiceGenerator {

    // Parametros para a geracao do token

    public static final String SECRET_KEY = "UMACHAVESECRETADASUAAPIAQUIUMACHAVESECRETADASUAAPIAQUIUMACHAVESECRETADASUAAPIAQUIUMACHAVESECRETADASUAAPIAQUI";

    public static final int HORAS_EXPIRACAO_TOKEN = 1;


 
    // Payload
 
    public Map<String, Object> gerarPayload(Usuario usuario) {

        Map<String, Object> payloadData = new HashMap<>();

        payloadData.put("username", usuario.getUsername());
        payloadData.put("id", usuario.getId().toString());
        payloadData.put("role", usuario.getRole());
        payloadData.put("outracoisa", "teste");

        return payloadData;
    }


    // Geracao do token

    public String generateToken(Usuario usuario) {

        Map<String, Object> payloadData = this.gerarPayload(usuario);

        Date agora = new Date();
        Date expiracao = new Date(agora.getTime() + (3600000L * HORAS_EXPIRACAO_TOKEN));

        return Jwts
                .builder()
                .claims(payloadData)
                .subject(usuario.getUsername())
                .issuedAt(agora)
                .expiration(expiracao)
                .signWith(getSigningKey())
                .compact();
    }


 
    // Extração das Claims
 
    private Claims extractAllClaims(String token) {

        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


 
    // Validação do Token

    public boolean isTokenValid(String token, UserDetails userDetails) {

        final String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }


    private Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }


    // Chave de assinatura
    
    private SecretKey getSigningKey() {

        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);

        return Keys.hmacShaKeyFor(keyBytes);
    }


    // Extração do username
    
    public String extractUsername(String token) {

        return extractClaim(token, Claims::getSubject);
    }


    // Extração do claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }
}