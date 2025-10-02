package com.example.gerenciador.controller;

import com.example.gerenciador.dto.SiteRequestDTO;
import com.example.gerenciador.model.Site;
import com.example.gerenciador.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    @Autowired
    private SiteService service;

    @GetMapping
    public List<Site> getAllSites() {
        return service.findAll();
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
}