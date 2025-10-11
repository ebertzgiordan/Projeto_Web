package com.example.gerenciador.dto;

public record DashboardGeralStatsDTO(
    long totalSites,
    long totalPatchPanels,
    long totalPortasDisponiveis,
    long portasEmUso,
    long totalUsuarios
) {}