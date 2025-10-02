package com.example.gerenciador.controller;

import com.example.gerenciador.dto.PasswordResetRequestDTO;
import com.example.gerenciador.dto.UsuarioResponseDTO;
import com.example.gerenciador.dto.UsuarioUpdateRequestDTO;
import com.example.gerenciador.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@PreAuthorize("hasRole('ADMIN')")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public List<UsuarioResponseDTO> getAllUsuarios() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUsuario(@PathVariable Long id, @RequestBody UsuarioUpdateRequestDTO data) {
        service.update(id, data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<Void> resetPassword(@PathVariable Long id, @RequestBody PasswordResetRequestDTO data) {
        service.resetPassword(id, data.novaSenha());
        return ResponseEntity.ok().build();
    }
}