package com.example.gerenciador.controller;

import com.example.gerenciador.dto.PontoDeRedeRequestDTO;
import com.example.gerenciador.dto.PontoDeRedeResponseDTO;
import com.example.gerenciador.model.PontoDeRede;
import com.example.gerenciador.service.PontoDeRedeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.gerenciador.dto.DashboardStatsDTO;

import java.util.List;

@RestController
@RequestMapping("/api/pontos-de-rede")
public class PontoDeRedeController {

    @Autowired
    private PontoDeRedeService service;

    /**
     * Endpoint para criar um novo Ponto de Rede.
     * Recebe os dados através do PontoDeRedeRequestDTO.
     */
    @PostMapping
    public ResponseEntity<Void> savePontoDeRede(@RequestBody PontoDeRedeRequestDTO data) {
        service.save(data);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PontoDeRedeResponseDTO> updatePontoDeRede(@PathVariable Long id, @RequestBody PontoDeRedeRequestDTO data) {
        PontoDeRedeResponseDTO pontoAtualizadoDTO = service.update(id, data);
        return ResponseEntity.ok(pontoAtualizadoDTO);
    }

    /**
     * Endpoint para listar todos os Pontos de Rede.
     * Retorna uma lista de PontoDeRedeResponseDTO, que formata a saída.
     */
    @GetMapping
    public List<PontoDeRedeResponseDTO> getAllPontosDeRede() {
        return service.findAll();
    }

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        return service.getDashboardStats();
    }

    /**
     * Endpoint para deletar um Ponto de Rede pelo seu ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePontoDeRede(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public PontoDeRedeResponseDTO getByPorta(@RequestParam String porta) {
        return service.findByPatchPanelPorta(porta);
    }
}