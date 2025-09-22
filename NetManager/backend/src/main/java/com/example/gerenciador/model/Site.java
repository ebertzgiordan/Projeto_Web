package com.example.gerenciador.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sites")
@Data
public class Site {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nome;

    private String endereco;
}