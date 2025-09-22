package com.example.gerenciador.controller;

import com.example.gerenciador.model.Site;
import com.example.gerenciador.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    @Autowired
    private SiteRepository repository;

    @GetMapping
    public List<Site> getAllSites() {
        return repository.findAll();
    }
}