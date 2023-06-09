package com.example.demo.dto;

public class NbaDataDto {
    private String nombreEquipo;
    private String logoUrl;

    public NbaDataDto(String nombreEquipo, String logoUrl) {
        this.nombreEquipo = nombreEquipo;
        this.logoUrl = logoUrl;
    }

    public String getNombreEquipo() {
        return nombreEquipo;
    }

    public void setNombreEquipo(String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
}
