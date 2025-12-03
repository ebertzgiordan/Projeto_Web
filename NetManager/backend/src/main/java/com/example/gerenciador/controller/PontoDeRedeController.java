package com.example.gerenciador.controller;

import com.example.gerenciador.dto.DashboardStatsDTO;
import com.example.gerenciador.dto.PontoDeRedeRequestDTO;
import com.example.gerenciador.dto.PontoDeRedeResponseDTO;
import com.example.gerenciador.service.PontoDeRedeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pontos-de-rede")
public class PontoDeRedeController {

    @Autowired
    private PontoDeRedeService service;


    @PutMapping("/{id}")
    public ResponseEntity<PontoDeRedeResponseDTO> updatePontoDeRede(@PathVariable Long id, @RequestBody PontoDeRedeRequestDTO data) {
        PontoDeRedeResponseDTO pontoAtualizadoDTO = service.update(id, data);
        return ResponseEntity.ok(pontoAtualizadoDTO);
    }


    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        return service.getDashboardStats();
    }


    @GetMapping("/by-panel/{panelId}")
    public List<PontoDeRedeResponseDTO> getPontosByPanel(@PathVariable Long panelId) {
        return service.findByPatchPanelId(panelId);
    }
}