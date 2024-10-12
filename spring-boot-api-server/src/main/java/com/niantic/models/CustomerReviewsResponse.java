package com.niantic.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerReviewsResponse {

    private String username;
    private String userRole;
    private String favoriteBreweries;
    private List<CustomerReviewDto> reviews;

}

