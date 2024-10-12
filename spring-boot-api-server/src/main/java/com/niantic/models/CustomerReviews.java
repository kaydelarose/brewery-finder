package com.niantic.models;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CustomerReviews {

    private int reviewId;
    private int customerId;
    private String breweryId;
    private int rating;
    private String customerReview;
    private LocalDate reviewDate;

}
