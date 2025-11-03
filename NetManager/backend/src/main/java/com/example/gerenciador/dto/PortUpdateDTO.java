package com.example.gerenciador.dto;

public record PortUpdateDTO(
    String panelNome,    
    Integer numeroPorta, 
    String tipoUso,      
    String localizacao,  
    Integer vlan         
) {}