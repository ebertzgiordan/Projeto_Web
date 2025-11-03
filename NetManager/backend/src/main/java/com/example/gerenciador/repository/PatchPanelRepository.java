package com.example.gerenciador.repository;
import com.example.gerenciador.model.PatchPanel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PatchPanelRepository extends JpaRepository<PatchPanel, Long> {
    List<PatchPanel> findBySiteId(Long siteId);
    Optional<PatchPanel> findBySiteIdAndNome(Long siteId, String nome);
    List<PatchPanel> findBySiteIdOrderByNomeAsc(Long siteId);
}
