package com.example.gerenciador.controller;

import com.example.gerenciador.dto.PasswordResetRequestDTO;
import com.example.gerenciador.dto.UsuarioResponseDTO;
import com.example.gerenciador.dto.UsuarioUpdateRequestDTO;
import com.example.gerenciador.model.Usuario;
import com.example.gerenciador.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponseDTO> getAuthenticatedUser(@AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(new UsuarioResponseDTO(usuario));
    }

    @PutMapping("/me")
    public ResponseEntity<Void> updateCurrentUser(@AuthenticationPrincipal Usuario usuario,
            @RequestBody UsuarioUpdateRequestDTO data) {
        service.update(usuario.getId(), data);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UsuarioResponseDTO> getAllUsers() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUserAsAdmin(@PathVariable Long id, @RequestBody UsuarioUpdateRequestDTO data) {
        service.update(id, data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/reset-password")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> resetPassword(@PathVariable Long id, @RequestBody PasswordResetRequestDTO data) {
        service.resetPassword(id, data.novaSenha());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteCurrentUser(@AuthenticationPrincipal Usuario usuario) {
        service.deleteById(usuario.getId());
        return ResponseEntity.noContent().build();
    }
}