package com.example.demo.services;


import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import java.io.File;

import org.springframework.stereotype.Component;

import com.example.demo.dto.JugadoresDataDto;
import com.example.demo.dto.NbaDataDto;

@Component("nbaLogoService")
public class WebScrapingService {
  
  public List<NbaDataDto> obtenerLogosEquipos() {
    List<NbaDataDto> logosEquipos = new ArrayList<>();
  
    try {
      Document document = Jsoup.connect("https://www.nba.com/teams").get();
      Elements equipoElements = document.select(".TeamLogo_logo__PclAJ");
  
      for (Element equipoElement : equipoElements) {
        String logoUrl = equipoElement.attr("src");
        String nombreEquipo = equipoElement.attr("alt");
      
        logosEquipos.add(new NbaDataDto(nombreEquipo, logoUrl));
      }
  
      return logosEquipos;
    } catch (IOException e) {
      e.printStackTrace();
    }
  
    return null;
  }

  public List<JugadoresDataDto> obtenerLogosEquiposDeArchivo() {
    List<JugadoresDataDto> logosEquipos = new ArrayList<>();

    Path path = Paths.get("/app/resultado.txt");
    try (BufferedReader br = new BufferedReader(new FileReader(path.toFile()))) {
        String line;
        while ((line = br.readLine()) != null) {
            String[] parts = line.split(", ");
            String nombreJugador = parts[0].substring(parts[0].indexOf(":") + 2);
            String logoUrl = parts[1].substring(parts[1].indexOf(":") + 2);
            logosEquipos.add(new JugadoresDataDto(nombreJugador, logoUrl));
        }
        return logosEquipos;
    } catch (IOException e) {
        e.printStackTrace();
    }

    return null;
}

}



