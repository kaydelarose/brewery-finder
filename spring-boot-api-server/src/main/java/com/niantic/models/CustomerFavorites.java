package com.niantic.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class CustomerFavorites {

    private int favoriteId;
    private int customerId;
    private String breweryId;
}
