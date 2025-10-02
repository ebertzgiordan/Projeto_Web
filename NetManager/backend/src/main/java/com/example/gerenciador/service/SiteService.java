package com.example.gerenciador.service;

import com.example.gerenciador.dto.SiteRequestDTO;
import com.example.gerenciador.model.Site;
import com.example.gerenciador.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    public List<Site> findAll() {
        return siteRepository.findAll();
    }

    public Site save(SiteRequestDTO data) {
        Site novoSite = new Site();
        novoSite.setNome(data.nome());
        novoSite.setEndereco(data.endereco());
        return siteRepository.save(novoSite);
    }

    public Site update(Long id, SiteRequestDTO data) {
        Site site = siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site não encontrado!"));
        site.setNome(data.nome());
        site.setEndereco(data.endereco());
        return siteRepository.save(site);
    }

    public void deleteById(Long id) {
        siteRepository.deleteById(id);
    }
}