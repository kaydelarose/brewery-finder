package com.niantic.models;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Brewer {

    private int brewerId;
    private int breweriesOwned;
    private int userId;


}
