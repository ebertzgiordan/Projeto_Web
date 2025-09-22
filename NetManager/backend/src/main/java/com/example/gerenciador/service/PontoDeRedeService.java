package com.example.gerenciador.service;

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

    // Método para deletar por ID
    public void deleteById(Long id) {
        pontoDeRedeRepository.deleteById(id);
    }
}