package com.example.gerenciador.controller;

import com.example.gerenciador.dto.ImportRequestDTO; 
import org.springframework.http.HttpStatus;
import com.example.gerenciador.dto.SiteRequestDTO;
import com.example.gerenciador.dto.SiteResponseDTO;
import com.example.gerenciador.model.Site;
import com.example.gerenciador.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    @Autowired
    private SiteService service;

    @GetMapping
    public List<SiteResponseDTO> getAllSites() {
        return service.findAllWithPortCount();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Site> getSiteById(@PathVariable Long id) {
        Optional<Site> site = service.findById(id);
        return site.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Site> createSite(@RequestBody SiteRequestDTO data) {
        Site novoSite = service.save(data);
        return ResponseEntity.ok(novoSite);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Site> updateSite(@PathVariable Long id, @RequestBody SiteRequestDTO data) {
        Site siteAtualizado = service.update(id, data);
        return ResponseEntity.ok(siteAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSite(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{siteId}/import-data")
    public ResponseEntity<Void> importData(
            @PathVariable Long siteId,
            @RequestBody ImportRequestDTO data) {
        try {
            service.importData(siteId, data);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}