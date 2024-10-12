package com.niantic.controllers;

import com.niantic.data.CustomerDao;
import com.niantic.data.CustomerFavoritesDao;
import com.niantic.models.CustomerFavorites;



import com.niantic.exceptions.HttpError;
import com.niantic.services.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@CrossOrigin
public class CustomerFavoritesController {
    private final CustomerFavoritesDao customerFavoritesDao;
    private final LoggingService logger;

    @Autowired
    public CustomerFavoritesController(CustomerFavoritesDao customerFavoritesDao, LoggingService logger) {
        this.customerFavoritesDao = customerFavoritesDao;
        this.logger = logger;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllFavorites(@RequestParam(required = false) Integer customerId,
                                             @RequestParam(required = false) String breweryId) {
        try {
            List<CustomerFavorites> favorites;
            if (customerId == null && breweryId == null) {
                favorites = customerFavoritesDao.getCustomerFavorites();
            } else if (breweryId == null) {
                favorites = customerFavoritesDao.getFavoritesByCustomerId(customerId);
            } else {
                favorites = customerFavoritesDao.getFavoritesByBreweryId(breweryId);
            }
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            logger.logMessage(e.getMessage());
            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFavoriteById(@PathVariable int id)
    {
        try {
            var favorite = customerFavoritesDao.getCustomerFavoriteById(id);
            if (favorite == null) {
                logger.logMessage("Favorite with ID " + id + " could not be found.");
                var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Favorite " + id + " is invalid.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            return ResponseEntity.ok(favorite);
        } catch (Exception e) {
            logger.logMessage(e.getMessage());
            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerFavorites addFavorite(@RequestBody CustomerFavorites customerFavorite) {
        return customerFavoritesDao.addCustomerFavorite(customerFavorite);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFavorite(@PathVariable int id, @RequestBody CustomerFavorites customerFavorite) {
        try {
            var currentFavorite = customerFavoritesDao.getCustomerFavorite(id);
            if (currentFavorite == null) {
                var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Favorite ID " + id + " is invalid.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            customerFavoritesDao.updateCustomerFavorite(id, customerFavorite);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFavorite(@PathVariable int id) {
        customerFavoritesDao.deleteCustomerFavorite(id);
    }
}
