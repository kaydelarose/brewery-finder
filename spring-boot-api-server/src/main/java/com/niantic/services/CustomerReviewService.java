package com.niantic.services;

import com.niantic.data.BreweryDao;
import com.niantic.data.CustomerDao;
import com.niantic.data.CustomerReviewsDao;
import com.niantic.data.UserDao;
import com.niantic.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CustomerReviewService {
    private final CustomerDao customerDao;
    private final CustomerReviewsDao customerReviewsDao;
    private final UserDao userDao;
    private final BreweryDao breweryDao;

    @Autowired
    public CustomerReviewService(CustomerDao customerDao,
                                 CustomerReviewsDao customerReviewsDao,
                                 UserDao userDao, BreweryDao breweryDao) {
        this.customerDao = customerDao;
        this.customerReviewsDao = customerReviewsDao;
        this.userDao = userDao;
        this.breweryDao = breweryDao;
    }

    public CustomerReviewsResponse getCustomerReviews(int customerId) {
        Customer customer = customerDao.getCustomer(customerId);
        if (customer == null) {
            throw new NoSuchElementException("Customer not found");
        }

        // Fetch user by userId from customer
        User user = userDao.getUserById(customer.getUserId());
        if (user == null) {
            throw new NoSuchElementException("User not found");
        }

        List<CustomerReviews> reviews = customerReviewsDao.getReviewByCustomerId(customerId);
        List<CustomerReviewDto> reviewDtos = new ArrayList<>();

        for (CustomerReviews review : reviews) {
            Brewery brewery = breweryDao.getBreweryById(review.getBreweryId());
            String breweryName = (brewery != null) ? brewery.getBreweryName() : "Unknown Brewery";
            String city = (brewery != null) ? brewery.getCity() : "Unknown city";
            String stateProvince = (brewery != null) ? brewery.getStateProvince() : "Unknown state province";

            CustomerReviewDto reviewDto = new CustomerReviewDto(
                    review.getReviewId(),
                    review.getCustomerReview(),
                    review.getRating(),
                    review.getReviewDate(),
                    breweryName,
                    city,
                    stateProvince
            );
            reviewDtos.add(reviewDto);
        }

        return new CustomerReviewsResponse(
                user.getUsername(),
                user.getRole(),
                customer.getFavoriteBreweries(),
                reviewDtos
        );
    }
}
