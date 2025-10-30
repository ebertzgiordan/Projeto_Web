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
                pontoDeRede.getSite().getNome() + "." + pontoDeRede.getPatchPanelPorta(),
                pontoDeRede.getTipoUso(),
                pontoDeRede.getLocalizacao(),
                pontoDeRede.getVlan(), 
                pontoDeRede.getIpAddress()
        );
    }
}