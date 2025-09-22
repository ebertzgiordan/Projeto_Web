package com.example.gerenciador.controller;

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

    /**
     * Endpoint para criar um novo Ponto de Rede.
     * Recebe os dados através do PontoDeRedeRequestDTO.
     */
    @PostMapping
    public ResponseEntity<Void> savePontoDeRede(@RequestBody PontoDeRedeRequestDTO data) {
        service.save(data);
        return ResponseEntity.ok().build();
    }

    /**
     * Endpoint para listar todos os Pontos de Rede.
     * Retorna uma lista de PontoDeRedeResponseDTO, que formata a saída.
     */
    @GetMapping
    public List<PontoDeRedeResponseDTO> getAllPontosDeRede() {
        return service.findAll();
    }

    /**
     * Endpoint para deletar um Ponto de Rede pelo seu ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePontoDeRede(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}