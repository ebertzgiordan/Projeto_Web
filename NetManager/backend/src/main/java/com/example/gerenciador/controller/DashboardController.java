package com.example.gerenciador.controller;

import com.example.gerenciador.dto.DashboardGeralStatsDTO;
import com.example.gerenciador.dto.SiteStatsDTO;
import com.example.gerenciador.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService service;


    @GetMapping("/site-stats/{siteId}")
    @PreAuthorize("hasRole('ADMIN') or @siteService.isOwner(#siteId, authentication.principal)")
    public SiteStatsDTO getSiteStats(@PathVariable Long siteId) {
        return service.getSiteStats(siteId);
    }

    @GetMapping("/general-stats")
    @PreAuthorize("isAuthenticated()") 
    public DashboardGeralStatsDTO getGeneralStats() {
        return service.getGeneralStats();
    }

}