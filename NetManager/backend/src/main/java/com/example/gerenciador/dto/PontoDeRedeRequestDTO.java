package com.example.gerenciador.dto;

public record PontoDeRedeRequestDTO(
        Long siteId,
        Long usuarioId,
        String patchPanelPorta,
        String tipoUso,
        String localizacao,
        Integer vlan,
        String ipAddress,
        String notas
) {}