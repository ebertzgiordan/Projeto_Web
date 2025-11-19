package com.example.gerenciador.controller;

import com.example.gerenciador.dto.LoginRequestDTO;
import com.example.gerenciador.dto.RegisterRequestDTO;
import com.example.gerenciador.model.Usuario;
import com.example.gerenciador.repository.UsuarioRepository;
import com.example.gerenciador.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map; 

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository repository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO data) {
        System.out.println(">>> [DEBUG] TENTATIVA DE LOGIN: " + data.email());

        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            
            System.out.println(">>> [DEBUG] AUTENTICAÇÃO SUCESSO. USUÁRIO: " + auth.getName());

            var usuario = (Usuario) auth.getPrincipal();
            var token = tokenService.generateToken(usuario);

            if (token == null) {
                System.out.println(">>> [ERRO CRÍTICO] TOKEN É NULO!");
                return ResponseEntity.internalServerError().body("Token gerado é nulo");
            }

            System.out.println(">>> [DEBUG] TOKEN GERADO: " + token.substring(0, 10) + "...");

            String jsonResponse = "{\"token\": \"" + token + "\"}";
            
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(jsonResponse);

        } catch (Exception e) {
            System.out.println(">>> [ERRO NO LOGIN] EXCEÇÃO: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequestDTO data) {
        if (this.repository.findByEmail(data.email()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        String encryptedPassword = passwordEncoder.encode(data.senha());
        Usuario newUser = new Usuario(null, data.nome(), data.email(), encryptedPassword, data.papel());
        this.repository.save(newUser);
        return ResponseEntity.ok().build();
    }
}