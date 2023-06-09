package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.NbaDataDto;
import com.example.demo.dto.JugadoresDataDto;
import com.example.demo.services.WebScrapingService;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/logo")
public class WebScrapingController {

    @Autowired

    private WebScrapingService nbaDataService;
    
    @GetMapping("data")
    public ResponseEntity<List<NbaDataDto>> getLogoEquipos() {
        return new ResponseEntity<List<NbaDataDto>>(nbaDataService.obtenerLogosEquipos(),
                HttpStatus.OK);
    }

    @GetMapping("data2")
    public ResponseEntity<List<JugadoresDataDto>> getLogoEquiposDeArchivo() {
        return new ResponseEntity<List<JugadoresDataDto>>(nbaDataService.obtenerLogosEquiposDeArchivo(),
                HttpStatus.OK);
    }
}