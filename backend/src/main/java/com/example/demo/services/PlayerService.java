package com.example.demo.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.PlayerRepository;
import com.example.demo.repository.PlayerSeasonRepository;
import com.example.demo.entity.Player;
import com.example.demo.entity.PlayerSeason;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    private final PlayerSeasonRepository playerSeasonRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository, PlayerSeasonRepository playerSeasonRepository) {
        this.playerRepository = playerRepository;
        this.playerSeasonRepository = playerSeasonRepository;
    }

    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    public List<Player> getAllPlayers() {
        return (List<Player>) playerRepository.findAll();
    }

    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }

    public List<PlayerSeason> getAllPlayerSeasons() {
        return (List<PlayerSeason>) playerSeasonRepository.findAll();
    }

    public Optional<PlayerSeason> getPlayerSeasonById(long id) {
        return playerSeasonRepository.findById(id);
    }

    public Optional<PlayerSeason> getPlayerSeasonsByPlayerId(long playerId) {
        return playerSeasonRepository.findById(playerId);
    }

    public PlayerSeason savePlayerSeason(PlayerSeason playerSeason) {
        return playerSeasonRepository.save(playerSeason);
    }

    public void deletePlayerSeason(long id) {
        playerSeasonRepository.deleteById(id);
    }
}
