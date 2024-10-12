package com.niantic.data;


import com.niantic.models.CustomerReviews;

import java.util.List;

public interface CustomerReviewsDao {
    List<CustomerReviews> getCustomerReviews();

    CustomerReviews getCustomerReviewById(int id);

    List<CustomerReviews> getReviewByCustomerId(int customerId);

    List<CustomerReviews> getReviewByBreweryId(String breweryId);

    CustomerReviews addCustomerReview(CustomerReviews customerReviews);

    void updateCustomerReview(int id, CustomerReviews customerReviews);

    void deleteCustomerReview(int id);


}
