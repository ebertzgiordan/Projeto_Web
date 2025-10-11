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
    private Integer numeroPorta; // Ex: 1, 2, 3... 24

    // O resto dos campos continua igual
    private String tipoUso;
    private String localizacao;
    private Integer vlan;
    @Column(name = "ip_address")
    private String ipAddress;
    private String notas;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario; // Usuário que fez a última modificação

    public void setSite(Site site) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setSite'");
    }

    public void setPatchPanelPorta(String patchPanelPorta) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setPatchPanelPorta'");
    }

    public PatchPanel getSite() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getSite'");
    }

    public String getPatchPanelPorta() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPatchPanelPorta'");
    }
}
