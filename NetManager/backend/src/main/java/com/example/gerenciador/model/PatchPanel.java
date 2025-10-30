package com.example.gerenciador.model;

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
    private String nome;

    @Column(name = "total_portas", nullable = false)
    private Integer totalPortas;

    @ManyToOne
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;
}