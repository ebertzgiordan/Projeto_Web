package com.example.gerenciador.service;

import com.example.gerenciador.dto.DashboardStatsDTO;
import com.example.gerenciador.dto.PontoDeRedeRequestDTO;
import com.example.gerenciador.dto.PontoDeRedeResponseDTO;
import com.example.gerenciador.model.PontoDeRede;
import com.example.gerenciador.model.Site;
import com.example.gerenciador.model.Usuario;
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
    private PontoDeRedeRepository pontoDeRedeRepository; // Repositório correto
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private SiteRepository siteRepository; // Repositório correto

    public PontoDeRedeResponseDTO update(Long id, PontoDeRedeRequestDTO data) {
        PontoDeRede pontoDeRede = pontoDeRedeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto de Rede não encontrado!"));

        // Atualiza apenas se os IDs de referência foram fornecidos
        if (data.usuarioId() != null) {
            Usuario usuario = usuarioRepository.findById(data.usuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
            pontoDeRede.setUsuario(usuario);
        }
        if (data.siteId() != null) {
            Site site = siteRepository.findById(data.siteId())
                    .orElseThrow(() -> new RuntimeException("Site não encontrado!"));
            pontoDeRede.setSite(site);
        }

        pontoDeRede.setPatchPanelPorta(data.patchPanelPorta());
        pontoDeRede.setTipoUso(data.tipoUso());
        pontoDeRede.setLocalizacao(data.localizacao());
        pontoDeRede.setVlan(data.vlan());
        pontoDeRede.setIpAddress(data.ipAddress());
        pontoDeRede.setNotas(data.notas());

        PontoDeRede pontoSalvo = pontoDeRedeRepository.save(pontoDeRede);
        return new PontoDeRedeResponseDTO(pontoSalvo);
    }

    // Método para listar todos, já retornando o DTO de resposta
    public List<PontoDeRedeResponseDTO> findAll() {
        return pontoDeRedeRepository.findAll().stream()
                .map(PontoDeRedeResponseDTO::new)
                .collect(Collectors.toList());
    }

    // Método para salvar um novo ponto de rede
    public PontoDeRede save(PontoDeRedeRequestDTO data) {
        // Busca as entidades relacionadas (Site e Usuario)
        Usuario usuario = usuarioRepository.findById(data.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
        Site site = siteRepository.findById(data.siteId())
                .orElseThrow(() -> new RuntimeException("Site não encontrado!"));

        // Cria a nova entidade PontoDeRede
        PontoDeRede novoPontoDeRede = new PontoDeRede();
        novoPontoDeRede.setUsuario(usuario);
        novoPontoDeRede.setSite(site);
        novoPontoDeRede.setPatchPanelPorta(data.patchPanelPorta());
        novoPontoDeRede.setTipoUso(data.tipoUso());
        novoPontoDeRede.setLocalizacao(data.localizacao());
        novoPontoDeRede.setVlan(data.vlan());
        novoPontoDeRede.setIpAddress(data.ipAddress());
        novoPontoDeRede.setNotas(data.notas());

        return pontoDeRedeRepository.save(novoPontoDeRede);
    }
    public DashboardStatsDTO getDashboardStats() {
        long totalPontos = pontoDeRedeRepository.count();
        long totalSites = siteRepository.count();
        long totalUsuarios = usuarioRepository.count();
        // Exemplo de consulta mais complexa: contar pontos que não são 'Reserva'
        long portasEmUso = pontoDeRedeRepository.findAll().stream()
                .filter(p -> p.getTipoUso() != null && !p.getTipoUso().equalsIgnoreCase("Reserva"))
                .count();

        return new DashboardStatsDTO(totalPontos, totalSites, totalUsuarios, portasEmUso);
    }

    public PontoDeRedeResponseDTO findByPatchPanelPorta(String porta) {
        PontoDeRede pontoDeRede = pontoDeRedeRepository.findByPatchPanelPortaIgnoreCase(porta)
                .orElseThrow(() -> new RuntimeException("Porta do Patch Panel não encontrada!"));
        return new PontoDeRedeResponseDTO(pontoDeRede);
    }

    // Método para deletar por ID
    public void deleteById(Long id) {
        pontoDeRedeRepository.deleteById(id);
    }
}