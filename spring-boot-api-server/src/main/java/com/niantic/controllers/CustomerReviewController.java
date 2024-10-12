package com.niantic.controllers;

import com.niantic.data.CustomerDao;
import com.niantic.data.CustomerReviewsDao;


import com.niantic.models.CustomerReviews;
import com.niantic.exceptions.HttpError;
import com.niantic.services.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin
public class CustomerReviewController {
    private final CustomerReviewsDao customerReviewsDao;
    private final CustomerDao customerDao;
    private final LoggingService logger;

    @Autowired
    public CustomerReviewController(CustomerReviewsDao customerReviewsDao, CustomerDao customerDao, LoggingService logger) {
        this.customerReviewsDao = customerReviewsDao;
        this.customerDao = customerDao;
        this.logger = logger;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllReviews(@RequestParam(required = false) Integer custId,
                                           @RequestParam(required = false) String brewId)
    {
        try{
            List<CustomerReviews> reviews;
            if(custId == null && brewId==null) reviews = customerReviewsDao.getCustomerReviews();
            else if (brewId == null) reviews  = customerReviewsDao.getReviewByCustomerId(custId);
            else reviews = customerReviewsDao.getReviewByBreweryId(brewId);

            return ResponseEntity.ok(reviews);

        }
        catch(Exception e)
        {
            logger.logMessage(e.getMessage());

            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewByCustomerId(@PathVariable int id)
    {
        try{
            var review = customerReviewsDao.getReviewByCustomerId(id);
            if(review == null)
            {
                logger.logMessage("Sorry, customer id " + id + " could not be found.");
                var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Customer with id " + id + " is invalid.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
            return ResponseEntity.ok(review);
        }
        catch(Exception e)
        {
            logger.logMessage(e.getMessage());
            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerReviews addReview(@RequestBody CustomerReviews customerReviews) {return customerReviewsDao.addCustomerReview(customerReviews);}

    @PutMapping("{id}")
    public ResponseEntity<?> updateCustomerReview(@PathVariable int id, @RequestBody CustomerReviews customerReviews)
    {
        try
        {
            var currentReview = customerReviewsDao.getCustomerReviewById(id);
            if(currentReview == null)
            {
                var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Review Id " + id + " is invalid.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);

            }

            customerReviewsDao.updateCustomerReview(id, customerReviews);
            return ResponseEntity.noContent().build();
        }
        catch(Exception e)
        {
            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong! ");

                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomerReview(@PathVariable int id) { customerReviewsDao.deleteCustomerReview(id); }


}

