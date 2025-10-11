package com.example.gerenciador.service;

import com.example.gerenciador.dto.SiteRequestDTO;
import com.example.gerenciador.dto.SiteResponseDTO;
import com.example.gerenciador.model.Site;
import com.example.gerenciador.model.Usuario;
import com.example.gerenciador.repository.PatchPanelRepository;
import com.example.gerenciador.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private PatchPanelRepository patchPanelRepository;

    /**
     *  @return
     */
    public List<SiteResponseDTO> findAllWithPortCount() {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Site> sitesParaProcessar;

        if (usuarioLogado.getPapel() == 1) {
            sitesParaProcessar = siteRepository.findAll();
        } else {
            sitesParaProcessar = siteRepository.findByUsuarioId(usuarioLogado.getId());
        }

        List<SiteResponseDTO> responseList = new ArrayList<>();
        for (Site site : sitesParaProcessar) {
            int totalPortas = patchPanelRepository.findBySiteId(site.getId()).stream()
                    .mapToInt(panel -> panel.getTotalPortas() != null ? panel.getTotalPortas() : 0)
                    .sum();
            responseList.add(new SiteResponseDTO(site, totalPortas));
        }
        return responseList;
    }

    /**
     * 
     * @param data
     * @return
     */
    public Site save(SiteRequestDTO data) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Site novoSite = new Site();
        novoSite.setNome(data.nome());
        novoSite.setEndereco(data.endereco());
        novoSite.setUsuario(usuarioLogado);

        return siteRepository.save(novoSite);
    }

    public Optional<Site> findById(Long id) {
        return siteRepository.findById(id);
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