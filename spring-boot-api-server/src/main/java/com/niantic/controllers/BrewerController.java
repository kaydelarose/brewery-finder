package com.niantic.controllers;

import java.util.List;
import com.niantic.data.BrewerDao;
import com.niantic.models.Brewer;
import com.niantic.services.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.niantic.exceptions.HttpError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/brewers")
@CrossOrigin
public class BrewerController
{
    private final BrewerDao brewerDao;
    private final LoggingService logger;

    @Autowired
    public BrewerController(BrewerDao brewerDao, LoggingService logger)
    {
        this.brewerDao = brewerDao;
        this.logger = logger;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<?> getAllBrewers()
    {
        try
        {
            List<Brewer> brewers = brewerDao.getAll();

            return ResponseEntity.ok(brewers);

        }
        catch (Exception e) {
            logger.logMessage(e.getMessage());
        }   var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }

    @GetMapping("{id}")
    public ResponseEntity<?> getBrewerById(@PathVariable int id)
        {
            try {
                Brewer brewer = brewerDao.getBrewerById(id);
                if (brewer == null) {
                    logger.logMessage("Brewer with id " + id + " not found.");
                    var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Brewer with id " + id + " can't be found.");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                }
                return ResponseEntity.ok(brewer);

            } catch (Exception e) {
                logger.logMessage(e.getMessage());
            }
               var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
            }

            @PostMapping("")
            @ResponseStatus(HttpStatus.CREATED)
            public Brewer addBrewer(@RequestBody Brewer brewer)
            {
            return brewerDao.addBrewer(brewer);
        }


            @PutMapping("{id}")
            public ResponseEntity<?> updateBrewer (@PathVariable int id, @RequestBody Brewer brewer){
            try {
                var currentBrewer = brewerDao.getBrewerById(id);
                if (currentBrewer == null) {
                    var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Brewer with id " + id + " is invalid");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                }
                brewerDao.updateBrewer(id, brewer);
                return ResponseEntity.noContent().build();
            } catch (Exception e) {
                var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
            }
        }


            @DeleteMapping("{id}")
            @ResponseStatus(HttpStatus.NO_CONTENT)
            public void deleteBrewer ( @PathVariable int id){
            brewerDao.deleteBrewer(id);


        }


}