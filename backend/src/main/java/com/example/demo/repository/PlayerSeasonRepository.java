package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.PlayerSeason;

@RepositoryRestResource
public interface PlayerSeasonRepository extends CrudRepository<PlayerSeason, Long> {

}