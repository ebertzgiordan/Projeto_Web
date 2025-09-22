package com.example.gerenciador.dto;

import com.example.gerenciador.model.PontoDeRede;

public record PontoDeRedeResponseDTO(
        Long id,
        String patchPanelPorta,
        String tipoUso,
        String localizacao,
        String nomeDoSite // Campo para mostrar o nome do Site ao qual o ponto pertence
) {
    /**
     * Este é um construtor especial que transforma um objeto da Entidade (PontoDeRede)
     * neste objeto de Resposta (DTO), selecionando apenas os campos que queremos mostrar.
     */
    public PontoDeRedeResponseDTO(PontoDeRede pontoDeRede) {
        this(
                pontoDeRede.getId(),
                pontoDeRede.getPatchPanelPorta(),
                pontoDeRede.getTipoUso(),
                pontoDeRede.getLocalizacao(),
                pontoDeRede.getSite().getNome() // Aqui pegamos o nome do Site associado
        );
    }
}