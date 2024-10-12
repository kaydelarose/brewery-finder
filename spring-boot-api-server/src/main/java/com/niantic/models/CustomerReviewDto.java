package com.niantic.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerReviewDto {
    private int reviewId;
    private String customerReview;
    private int rating;
    private LocalDate reviewDate;
    private String breweryName;
    private String city;
    private String stateProvince;
}
