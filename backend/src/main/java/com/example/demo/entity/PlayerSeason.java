package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="season")
public class PlayerSeason {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank
    private String year;
    @NotBlank
    private String team;
    private String points;
    private String assists;
    private String rebounds;
    private String blocking;
    private String steals;
    private long playerId;
    private String games;

    public PlayerSeason() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long value) {
        this.id = value;
    }

    public String getYear() {
        return this.year;
    }

    public void setYear(String value) {
        this.year = value;
    }

    public String getTeam() {
        return this.team;
    }

    public void setTeam(String value) {
        this.team = value;
    }

    public String getPoints() {
        return this.points;
    }

    public void setPoints(String value) {
        this.points = value;
    }

    public String getAssists() {
        return this.assists;
    }

    public void setAssists(String value) {
        this.assists = value;
    }

    public String getRebounds() {
        return this.rebounds;
    }

    public void setRebounds(String value) {
        this.rebounds = value;
    }

    public String getBlocking() {
        return this.blocking;
    }

    public void setBlocking(String value) {
        this.blocking = value;
    }

    public String getSteals() {
        return this.steals;
    }

    public void setSteals(String value) {
        this.steals = value;
    }

    public long getPlayerId() {
        return this.playerId;
    }

    public void setPlayerId(long value) {
        this.playerId = value;
    }

    public String getGames() {
        return this.games;
    }

    public void setGames(String value) {
        this.games = value;
    }

}
