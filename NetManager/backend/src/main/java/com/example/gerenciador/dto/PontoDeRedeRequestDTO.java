package com.example.gerenciador.dto;

/**
 * DTO (Data Transfer Object) para receber os dados de criação
 * de um novo Ponto de Rede.
 * Contém todas as variáveis necessárias enviadas pelo cliente.
 */
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