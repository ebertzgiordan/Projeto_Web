package com.example.gerenciador.repository;

import com.example.gerenciador.model.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; 

public interface SiteRepository extends JpaRepository<Site, Long> {

    List<Site> findByUsuarioId(Long usuarioId);
}