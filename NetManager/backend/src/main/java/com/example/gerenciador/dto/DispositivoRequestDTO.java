package com.example.gerenciador.dto;

public record DispositivoRequestDTO(
        Long usuarioId,
        Long categoriaId,
        String ipAddress,
        String macAddress,
        String status,
        String gateway
) {}