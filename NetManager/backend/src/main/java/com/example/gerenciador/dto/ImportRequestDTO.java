package com.example.gerenciador.dto;

import java.util.List;

public record ImportRequestDTO(
    String notasAdicionais,
    List<PortUpdateDTO> portUpdates
) {}