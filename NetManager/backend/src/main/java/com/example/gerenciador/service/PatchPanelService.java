package com.example.gerenciador.service;

import com.example.gerenciador.model.PatchPanel;
import com.example.gerenciador.model.PontoDeRede;
import com.example.gerenciador.repository.PatchPanelRepository;
import com.example.gerenciador.repository.PontoDeRedeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PatchPanelService {

    @Autowired
    private PatchPanelRepository patchPanelRepository;

    @Autowired
    private PontoDeRedeRepository pontoDeRedeRepository;

    @Transactional
    public PatchPanel createPatchPanelAndPorts(PatchPanel patchPanel) {
        PatchPanel savedPanel = patchPanelRepository.save(patchPanel);

        for (int i = 1; i <= savedPanel.getTotalPortas(); i++) {
            PontoDeRede novoPonto = new PontoDeRede();
            novoPonto.setPatchPanel(savedPanel);
            novoPonto.setNumeroPorta(i);
            novoPonto.setTipoUso("Vaga"); 
            pontoDeRedeRepository.save(novoPonto);
        }
        return savedPanel;
    }
}