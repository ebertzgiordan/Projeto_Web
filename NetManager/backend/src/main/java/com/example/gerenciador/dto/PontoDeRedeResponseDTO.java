package com.example.gerenciador.dto;

import com.example.gerenciador.model.PontoDeRede;

public record PontoDeRedeResponseDTO(
        Long id,
        String nomeCompletoDaPorta,
        String tipoUso,
        String localizacao,
        Integer vlan,
        String ipAddress
) {
    public PontoDeRedeResponseDTO(PontoDeRede pontoDeRede) {
        this(
                pontoDeRede.getId(),
                pontoDeRede.getPatchPanel().getNome() + "." + String.format("%02d", pontoDeRede.getNumeroPorta()),
                pontoDeRede.getTipoUso(),
                pontoDeRede.getLocalizacao(),
                pontoDeRede.getVlan(),
                pontoDeRede.getIpAddress()
        );
    }
}