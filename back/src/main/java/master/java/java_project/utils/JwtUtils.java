package master.java.java_project.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
@Component
public class JwtUtils {
    @Value("${security.jwt.token.secret-key:secret-key}")
    private  String secretKey;

    @PostConstruct
    protected void init() {
        // this is to avoid having the raw secret key available in the JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public  String extractUsername(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        DecodedJWT decodedJWT = JWT.require(algorithm).build().verify(token.replace("Bearer ", ""));
        return decodedJWT.getSubject(); // Extract the username (login)
    }
}