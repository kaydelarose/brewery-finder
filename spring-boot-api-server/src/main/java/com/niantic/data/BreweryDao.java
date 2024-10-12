package com.niantic.data;

import com.niantic.models.Brewery;

import java.util.List;

public interface BreweryDao {

    List<Brewery> getBreweries();

    Brewery getBreweryById(String id);

    List<Brewery> getBreweryByBrewerId(int id);

    Brewery addBrewery(Brewery Brewery);

    void updateBrewery(String id, Brewery brewery);


    void deleteBrewery(String id);
}
