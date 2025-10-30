package com.example.gerenciador.dto;

import lombok.Data;

@Data
public class PortImport {
    private String nomeDaPorta;
    private String localizacao;
    private String vlan;
    private String ipAddress;
    private String tipoUso;
    private String notas;
}