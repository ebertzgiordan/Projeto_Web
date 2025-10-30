package com.example.gerenciador.dto;

import lombok.Data;

@Data
public class PatchPanelCreateDTO {

    private Long siteId;

    private String nome;

    private Integer totalPortas;

    public PatchPanelCreateDTO() {
    }

    public PatchPanelCreateDTO(Long siteId, String nome, Integer totalPortas) {
        this.siteId = siteId;
        this.nome = nome;
        this.totalPortas = totalPortas;
    }

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getTotalPortas() {
        return totalPortas;
    }

    public void setTotalPortas(Integer totalPortas) {
        this.totalPortas = totalPortas;
    }
}