package com.example.gerenciador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "patch_panels")
@Data
public class PatchPanel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome; // Ex: "LG.01"

    @Column(name = "total_portas", nullable = false)
    private Integer totalPortas;

    @ManyToOne
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;

    @OneToMany(mappedBy = "patchPanel", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore // Evita loops
    private List<PontoDeRede> pontosDeRede;
}
