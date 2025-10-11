package com.example.gerenciador.repository;
import com.example.gerenciador.model.PatchPanel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PatchPanelRepository extends JpaRepository<PatchPanel, Long> {
    List<PatchPanel> findBySiteId(Long siteId);
}
