package com.example.gerenciador.service;

import com.example.gerenciador.dto.DashboardGeralStatsDTO;
import com.example.gerenciador.dto.SiteStatsDTO;
import com.example.gerenciador.model.PatchPanel;
import com.example.gerenciador.model.Site;
import com.example.gerenciador.model.Usuario;
import com.example.gerenciador.repository.PatchPanelRepository;
import com.example.gerenciador.repository.PontoDeRedeRepository;
import com.example.gerenciador.repository.SiteRepository;
import com.example.gerenciador.repository.UsuarioRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private PatchPanelRepository patchPanelRepository;
    @Autowired
    private PontoDeRedeRepository pontoDeRedeRepository;
    @Autowired
    private SiteRepository siteRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

   public SiteStatsDTO getSiteStats(Long siteId) {
        long totalPortas = patchPanelRepository.findBySiteId(siteId).stream()
                .mapToInt(panel -> panel.getTotalPortas() != null ? panel.getTotalPortas() : 0)
                .sum();

        long portasEmUso = pontoDeRedeRepository.findAll().stream()
                .filter(ponto -> ponto.getPatchPanel().getSite().getId().equals(siteId))
                .filter(ponto -> ponto.getTipoUso() != null &&
                        !ponto.getTipoUso().equalsIgnoreCase("Vaga") &&
                        !ponto.getTipoUso().equalsIgnoreCase("Reserva"))
                .count();

        return new SiteStatsDTO(totalPortas, portasEmUso);
    }

    public DashboardGeralStatsDTO getGeneralStats() {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (usuarioLogado.getPapel() == 1) {
            long totalSites = siteRepository.count();
            long totalPatchPanels = patchPanelRepository.count();
            long totalUsuarios = usuarioRepository.count();

            long totalPortasDisponiveis = patchPanelRepository.findAll().stream()
                .mapToInt(panel -> panel.getTotalPortas() != null ? panel.getTotalPortas() : 0)
                .sum();

            long portasEmUso = pontoDeRedeRepository.findAll().stream()
                .filter(p -> p.getTipoUso() != null &&
                             !p.getTipoUso().equalsIgnoreCase("Reserva") &&
                             !p.getTipoUso().equalsIgnoreCase("Vaga"))
                .count();

            return new DashboardGeralStatsDTO(totalSites, totalPatchPanels, totalPortasDisponiveis, portasEmUso, totalUsuarios);
        } 

        else {
            List<Site> sitesDoUsuario = siteRepository.findByUsuarioId(usuarioLogado.getId());
            List<Long> siteIds = sitesDoUsuario.stream().map(Site::getId).collect(Collectors.toList());

            List<PatchPanel> panelsDoUsuario = patchPanelRepository.findAllById(siteIds);

            long totalSites = sitesDoUsuario.size();
            long totalPatchPanels = panelsDoUsuario.size();

            long totalPortasDisponiveis = panelsDoUsuario.stream()
                .mapToInt(panel -> panel.getTotalPortas() != null ? panel.getTotalPortas() : 0)
                .sum();

            List<Long> panelIds = panelsDoUsuario.stream().map(PatchPanel::getId).collect(Collectors.toList());
            long portasEmUso = pontoDeRedeRepository.findAll().stream()
                .filter(ponto -> panelIds.contains(ponto.getPatchPanel().getId()))
                .filter(p -> p.getTipoUso() != null &&
                             !p.getTipoUso().equalsIgnoreCase("Reserva") &&
                             !p.getTipoUso().equalsIgnoreCase("Vaga"))
                .count();

            return new DashboardGeralStatsDTO(totalSites, totalPatchPanels, totalPortasDisponiveis, portasEmUso, 1);
        }
    }
}