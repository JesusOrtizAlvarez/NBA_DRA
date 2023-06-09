package com.example.demo.dto;

public class JugadoresDataDto {
    private String nombreJugador;
    private String imagenUrl;

    public JugadoresDataDto(String nombreJugador, String imagenUrl) {
        this.nombreJugador = nombreJugador;
        this.imagenUrl = imagenUrl;
    }

    public String getNombreJugador() {
        return nombreJugador;
    }

    public void setNombreJugador(String nombreJugador) {
        this.nombreJugador = nombreJugador;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
}
