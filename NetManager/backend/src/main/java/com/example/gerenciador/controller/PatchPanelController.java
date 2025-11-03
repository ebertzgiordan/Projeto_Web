package com.example.gerenciador.controller;

import com.example.gerenciador.model.PatchPanel;
import com.example.gerenciador.model.Site;
import com.example.gerenciador.repository.PatchPanelRepository;
import com.example.gerenciador.repository.SiteRepository;
import com.example.gerenciador.service.PatchPanelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patch-panels")
public class PatchPanelController {

    @Autowired
    private PatchPanelRepository patchPanelRepository;

    @Autowired
    private SiteRepository siteRepository;
    
    @Autowired
    private PatchPanelService patchPanelService;

    @GetMapping("/by-site/{siteId}")
    public List<PatchPanel> getPanelsBySite(@PathVariable Long siteId) {
        
        return patchPanelRepository.findBySiteIdOrderByNomeAsc(siteId);
    }

    @PostMapping("/by-site/{siteId}")
    public ResponseEntity<PatchPanel> createPanel(@PathVariable Long siteId, @RequestBody PatchPanel panelData) {
        Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> new RuntimeException("Site não encontrado!"));
        panelData.setSite(site);
        PatchPanel novoPanel = patchPanelService.createPatchPanelAndPorts(panelData);
        return ResponseEntity.ok(novoPanel);
    }
}
