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
    @JoinColumn(name = "site_id")
    private Site site;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "patch_panel_porta")
    private String patchPanelPorta;

    @Column(name = "tipo_uso")
    private String tipoUso;

    private String localizacao;
    private Integer vlan;

    @Column(name = "ip_address")
    private String ipAddress;

    private String notas;
}