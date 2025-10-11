package com.example.gerenciador.service;

import com.example.gerenciador.dto.DashboardStatsDTO;
import com.example.gerenciador.dto.PontoDeRedeRequestDTO;
import com.example.gerenciador.dto.PontoDeRedeResponseDTO;
import com.example.gerenciador.model.PontoDeRede;
import com.example.gerenciador.model.Usuario;
import com.example.gerenciador.repository.PatchPanelRepository;
import com.example.gerenciador.repository.PontoDeRedeRepository;
import com.example.gerenciador.repository.SiteRepository;
import com.example.gerenciador.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PontoDeRedeService {

    @Autowired
    private PontoDeRedeRepository pontoDeRedeRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private SiteRepository siteRepository;
    @Autowired
    private PatchPanelRepository patchPanelRepository;

    public PontoDeRedeResponseDTO update(Long id, PontoDeRedeRequestDTO data) {
        PontoDeRede pontoDeRede = pontoDeRedeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto de Rede não encontrado!"));

        Usuario usuario = usuarioRepository.findById(data.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        pontoDeRede.setUsuario(usuario);
        pontoDeRede.setTipoUso(data.tipoUso());
        pontoDeRede.setLocalizacao(data.localizacao());
        pontoDeRede.setVlan(data.vlan());
        pontoDeRede.setIpAddress(data.ipAddress());
        pontoDeRede.setNotas(data.notas());

        PontoDeRede pontoSalvo = pontoDeRedeRepository.save(pontoDeRede);
        return new PontoDeRedeResponseDTO(pontoSalvo);
    }

    public List<PontoDeRedeResponseDTO> findByPatchPanelId(Long panelId) {
        return pontoDeRedeRepository.findByPatchPanelIdOrderByNumeroPortaAsc(panelId).stream()
                .map(PontoDeRedeResponseDTO::new)
                .collect(Collectors.toList());
    }

    public DashboardStatsDTO getDashboardStats() {
        long totalSites = siteRepository.count();
        long totalPontosCadastrados = pontoDeRedeRepository.count();
        long totalPortasDisponiveis = patchPanelRepository.findAll().stream()
                .mapToInt(panel -> panel.getTotalPortas() != null ? panel.getTotalPortas() : 0)
                .sum();
        long portasEmUso = pontoDeRedeRepository.findAll().stream()
                .filter(p -> p.getTipoUso() != null &&
                             !p.getTipoUso().equalsIgnoreCase("Reserva") &&
                             !p.getTipoUso().equalsIgnoreCase("Vaga"))
                .count();

        return new DashboardStatsDTO(totalSites, totalPontosCadastrados, totalPortasDisponiveis, portasEmUso);
    }
}