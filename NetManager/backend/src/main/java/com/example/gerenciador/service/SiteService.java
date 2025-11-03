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

import com.example.gerenciador.dto.ImportRequestDTO;
import com.example.gerenciador.dto.PortUpdateDTO;
import com.example.gerenciador.model.PatchPanel;
import com.example.gerenciador.model.PontoDeRede;
import com.example.gerenciador.repository.PontoDeRedeRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private PatchPanelRepository patchPanelRepository;

    @Autowired
    private PontoDeRedeRepository pontoDeRedeRepository;
    @Autowired
    private PatchPanelService patchPanelService;

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
        novoSite.setNotas(data.notas()); 
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
        site.setNotas(data.notas()); 
        return siteRepository.save(site);
    }

    public void deleteById(Long id) {
        siteRepository.deleteById(id);
    }

    @Transactional
    public void importData(Long siteId, ImportRequestDTO data) {
        
        Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> new RuntimeException("Site não encontrado!"));

        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (data.notasAdicionais() != null && !data.notasAdicionais().isEmpty()) {
            String notasAntigas = (site.getNotas() != null) ? site.getNotas() : "";
            String separador = notasAntigas.isEmpty() ? "" : "\n\n";
            
            site.setNotas(notasAntigas + separador + "--- NOTAS DA IMPORTAÇÃO ---\n" + data.notasAdicionais());
            siteRepository.save(site);
        }

        for (PortUpdateDTO portUpdate : data.portUpdates()) {
            
            PatchPanel panel = patchPanelRepository.findBySiteIdAndNome(siteId, portUpdate.panelNome())
                .orElseGet(() -> {
                    PatchPanel novoPanel = new PatchPanel();
                    novoPanel.setNome(portUpdate.panelNome());
                    novoPanel.setTotalPortas(24); 
                    novoPanel.setSite(site);
                    return patchPanelService.createPatchPanelAndPorts(novoPanel); 
                });

            PontoDeRede porta = pontoDeRedeRepository
                .findByPatchPanelIdAndNumeroPorta(panel.getId(), portUpdate.numeroPorta())
                .orElseGet(() -> {

                    PontoDeRede novaPorta = new PontoDeRede();
                    novaPorta.setPatchPanel(panel);
                    novaPorta.setNumeroPorta(portUpdate.numeroPorta());
                    novaPorta.setTipoUso("Vaga");
                    return pontoDeRedeRepository.save(novaPorta);
                });


            porta.setTipoUso(portUpdate.tipoUso());
            porta.setLocalizacao(portUpdate.localizacao());
            porta.setVlan(portUpdate.vlan()); 
            porta.setUsuario(usuarioLogado);
            
            pontoDeRedeRepository.save(porta);
        }
    }
}