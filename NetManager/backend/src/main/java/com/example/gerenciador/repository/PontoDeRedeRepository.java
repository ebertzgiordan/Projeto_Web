package com.example.gerenciador.repository;

import com.example.gerenciador.model.PontoDeRede;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PontoDeRedeRepository extends JpaRepository<PontoDeRede, Long> {
    Optional<PontoDeRede> findByPatchPanelPortaIgnoreCase(String patchPanelPorta);
}