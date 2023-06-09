package com.example.demo.entity;

import java.lang.reflect.Array;
import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String first_name;
    private String last_name;
    private int age;
    private String photo;
    private String position;
    private ArrayList<String> seasons = new ArrayList<String>();


    public Player() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long value) {
        this.id = value;
    }

    public String getFirst_name() {
        return this.first_name;
    }

    public void setFirst_name(String value) {
        this.first_name = value;
    }

    public String getLast_name() {
        return this.last_name;
    }

    public void setLast_name(String value) {
        this.last_name = value;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int value) {
        this.age = value;
    }   

    public String getPhoto() {
        return this.photo;
    }

    public void setPhoto(String value) {
        this.photo = value;
    }

    public ArrayList<String> getSeasons() {
        return this.seasons;
    }

    public void setSeasons(ArrayList<String> value) {
        this.seasons = value;
    }

    public String getPosition() {
        return this.position;
    }

    public void setPosition(String value) {
        this.position = value;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getFirst_name() + "'" +
            ", last_name='" + getLast_name() + "'" +
            ", age='" + getAge() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", seasons='" + getSeasons() + "'" +
            ", position='" + getPosition() + "'" +
            "}";
    }

}