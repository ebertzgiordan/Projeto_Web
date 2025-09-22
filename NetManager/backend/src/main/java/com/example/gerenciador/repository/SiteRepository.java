package com.example.gerenciador.repository;

import com.example.gerenciador.model.Site;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteRepository extends JpaRepository<Site, Long> {
}