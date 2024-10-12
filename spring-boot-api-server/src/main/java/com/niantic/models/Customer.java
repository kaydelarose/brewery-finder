package com.niantic.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class Customer {

    private int customerId;
    private String favoriteBreweries;
    private int totalReviews;
    private int userId;


}