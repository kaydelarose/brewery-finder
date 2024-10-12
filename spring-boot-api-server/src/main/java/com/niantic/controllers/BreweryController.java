package com.niantic.controllers;

import com.niantic.data.BreweryDao;
import com.niantic.models.Brewery;
import com.niantic.services.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.niantic.exceptions.HttpError;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/breweries")
@CrossOrigin
public class BreweryController {

    private final BreweryDao breweryDao;
    private final LoggingService logger;

    @Autowired
    public BreweryController(BreweryDao breweryDao, LoggingService logger) {
        this.breweryDao = breweryDao;
        this.logger = logger;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<?> getAllBreweries(@RequestParam(required = false)Integer brewId) {

        try {
            List<Brewery> breweries;
            if(brewId == null) breweries = breweryDao.getBreweries();
            else breweries = breweryDao.getBreweryByBrewerId(brewId);

            return ResponseEntity.ok(breweries);
        }
        catch (Exception e) {
            logger.logMessage(e.getMessage());

            var error =  new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(),HttpStatus.INTERNAL_SERVER_ERROR.toString(),"Oops, something went wrong!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBreweryById(@PathVariable String id) {
        try
        {
            var brewery = breweryDao.getBreweryById(id);
            if (brewery == null)
            {
                logger.logMessage("Brewery with id " + id + " not found.");
                var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Brewery with id " + id + "can't be found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(error);
            }

            return ResponseEntity.ok(brewery);
        }
        catch(Exception e)
        {
            logger.logMessage(e.getMessage());
            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_BREWER', 'ROLE_ADMIN')")
    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public Brewery addBrewery(@RequestBody Brewery brewery) { return breweryDao.addBrewery(brewery); }

    @PreAuthorize("hasAnyRole('ROLE_BREWER', 'ROLE_ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<?> updateBrewery(@PathVariable String id, @RequestBody Brewery brewery)
    {
        try
        {
            var currentBrewery = breweryDao.getBreweryById(id);
            if (currentBrewery == null)
            {
                var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Brewery with id " + id + " is invalid");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(error);
            }

            breweryDao.updateBrewery(id, brewery);
            return ResponseEntity.noContent()
                    .build();
        }
        catch (Exception e)
        {
            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBrewery(@PathVariable String id) { breweryDao.deleteBrewery(id); }

}

