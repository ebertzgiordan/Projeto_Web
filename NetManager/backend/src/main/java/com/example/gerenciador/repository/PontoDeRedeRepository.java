package com.example.gerenciador.repository;

import com.example.gerenciador.model.PontoDeRede;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PontoDeRedeRepository extends JpaRepository<PontoDeRede, Long> {
    List<PontoDeRede> findByPatchPanelIdOrderByNumeroPortaAsc(Long patchPanelId);
    Optional<PontoDeRede> findByPatchPanelIdAndNumeroPorta(Long patchPanelId, Integer numeroPorta);

}