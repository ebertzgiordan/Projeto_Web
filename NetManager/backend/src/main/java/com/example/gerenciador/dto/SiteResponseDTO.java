package com.example.gerenciador.dto;

import com.example.gerenciador.model.Site;

public record SiteResponseDTO(
    Long id,
    String nome,
    String endereco,
    String notas,
    Integer totalPortas 
) {

    public SiteResponseDTO(Site site, Integer totalPortas) {
        this(site.getId(), site.getNome(), site.getEndereco(), site.getNotas(), totalPortas); // <-- ADICIONE site.getNotas() AQUI
    }
}