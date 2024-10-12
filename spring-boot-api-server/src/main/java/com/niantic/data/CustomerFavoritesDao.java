package com.niantic.data;
import com.niantic.models.CustomerFavorites;

import java.util.List;

public interface CustomerFavoritesDao {

    List<CustomerFavorites> getCustomerFavorites();

    CustomerFavorites getCustomerFavorite(int favoriteId);

    CustomerFavorites getCustomerFavoriteById(int id);

    List<CustomerFavorites> getFavoritesByCustomerId(int customerId);

    List<CustomerFavorites> getFavoritesByBreweryId(String breweryId);

    CustomerFavorites addCustomerFavorite(CustomerFavorites customerFavorite);

    void updateCustomerFavorite(int favoriteId, CustomerFavorites customerFavorite);

    void deleteCustomerFavorite(int favoriteId);
}

