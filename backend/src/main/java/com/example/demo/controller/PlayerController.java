package com.example.demo.controller;

import com.example.demo.entity.Player;
import com.example.demo.entity.PlayerSeason;
import com.example.demo.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long id) {
        Optional<Player> player = playerService.getPlayerById(id);
        return player.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Player savedPlayer = playerService.savePlayer(player);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlayer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        Optional<Player> existingPlayer = playerService.getPlayerById(id);
        if (existingPlayer.isPresent()) {
            player.setId(id);
            Player updatedPlayer = playerService.savePlayer(player);
            return ResponseEntity.ok(updatedPlayer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        Optional<Player> existingPlayer = playerService.getPlayerById(id);
        if (existingPlayer.isPresent()) {
            playerService.deletePlayer(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{playerId}/seasons")
    public ResponseEntity<Optional<PlayerSeason>> getPlayerSeasonsByPlayerId(@PathVariable long playerId) {
        Optional<PlayerSeason> playerSeasons = playerService.getPlayerSeasonsByPlayerId(playerId);
        return ResponseEntity.ok(playerSeasons);
    }

    @GetMapping("/seasons/{id}")
    public ResponseEntity<PlayerSeason> getPlayerSeasonById(@PathVariable long id) {
        Optional<PlayerSeason> playerSeason = playerService.getPlayerSeasonById(id);
        return playerSeason.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{playerId}/seasons")
    public ResponseEntity<PlayerSeason> createPlayerSeason(@PathVariable long playerId, @RequestBody PlayerSeason playerSeason) {
        playerSeason.setPlayerId(playerId);
        PlayerSeason savedPlayerSeason = playerService.savePlayerSeason(playerSeason);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlayerSeason);
    }

    @PutMapping("/seasons/{id}")
    public ResponseEntity<PlayerSeason> updatePlayerSeason(@PathVariable long id, @RequestBody PlayerSeason playerSeason) {
        Optional<PlayerSeason> existingPlayerSeason = playerService.getPlayerSeasonById(id);
        if (existingPlayerSeason.isPresent()) {
            playerSeason.setId(id);
            PlayerSeason updatedPlayerSeason = playerService.savePlayerSeason(playerSeason);
            return ResponseEntity.ok(updatedPlayerSeason);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/seasons/{id}")
    public ResponseEntity<Void> deletePlayerSeason(@PathVariable long id) {
        Optional<PlayerSeason> existingPlayerSeason = playerService.getPlayerSeasonById(id);
        if (existingPlayerSeason.isPresent()) {
            playerService.deletePlayerSeason(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}