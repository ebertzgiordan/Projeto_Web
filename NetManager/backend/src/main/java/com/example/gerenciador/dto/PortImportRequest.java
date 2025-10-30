package com.example.gerenciador.dto;

import java.util.List;
import lombok.Data;

@Data
public class PortImportRequest {
    private List<PortImport> ports;
}