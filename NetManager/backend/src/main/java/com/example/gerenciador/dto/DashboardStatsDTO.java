package com.example.gerenciador.dto;

public record DashboardStatsDTO(
        long totalPontosDeRede,
        long totalSites,
        long totalUsuarios,
        long portasEmUso
)
{}