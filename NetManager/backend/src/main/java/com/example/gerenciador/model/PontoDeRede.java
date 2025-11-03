package com.example.gerenciador.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pontos_de_rede")
@Data
public class PontoDeRede {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patch_panel_id", nullable = false)
    private PatchPanel patchPanel;

    @Column(nullable = false)
    private Integer numeroPorta;

    private String tipoUso;
    private String localizacao;
    private Integer vlan;
    @Column(name = "ip_address")
    private String ipAddress;
    private String notas;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario; 

}