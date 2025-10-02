package com.example.gerenciador.dto;

import com.example.gerenciador.model.Usuario;

public record UsuarioResponseDTO(Long id, String nome, String email, Integer papel) {
    public UsuarioResponseDTO(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getPapel());
    }
}