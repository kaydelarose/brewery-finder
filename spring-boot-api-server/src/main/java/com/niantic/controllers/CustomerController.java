package com.niantic.controllers;

import com.niantic.data.CustomerDao;
import com.niantic.data.UserDao;
import com.niantic.models.Customer;
import com.niantic.models.CustomerReviewsResponse;
import com.niantic.services.CustomerReviewService;
import com.niantic.services.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.niantic.exceptions.HttpError;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/customers")
@CrossOrigin
public class CustomerController
{
    private final CustomerDao customerDao;
    private final LoggingService logger;
    private final CustomerReviewService customerReviewService;
    private final UserDao userDao;

    @Autowired
    public CustomerController(CustomerDao customerDao, LoggingService logger, CustomerReviewService customerReviewService, UserDao userDao) {
        this.customerDao = customerDao;
        this.logger = logger;
        this.customerReviewService = customerReviewService;
        this.userDao = userDao;
    }

    @GetMapping({"", "/"})
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getAllCustomers()
    {
        try
        {
            var customers = customerDao.getCustomers();

            return ResponseEntity.ok(customers);
        }
        catch (Exception e)
        {
            logger.logMessage(e.getMessage());

            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(),HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(error);
        }
    }

    @GetMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCustomerById(@PathVariable int id)
    {
        try
        {
            var customer = customerDao.getCustomer(id);
            if (customer == null)
            {
                logger.logMessage("Customer with id " + id + " not found.");
                var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Customer with id " + id + "can't be found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body(error);
            }

            return ResponseEntity.ok(customer);
        }
        catch(Exception e)
        {
            logger.logMessage(e.getMessage());
            var error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Oops, something went wrong!");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(error);
        }
    }

    @GetMapping("/reviews/{customerId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CustomerReviewsResponse> getCustomerReviews(@PathVariable int customerId, Principal principal) {
        CustomerReviewsResponse response = customerReviewService.getCustomerReviews(customerId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/reviews")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CustomerReviewsResponse> getCurrentCustomerReviews(Principal principal) {
        // Use the service to fetch reviews and username
        int userId = userDao.getIdByUsername(principal.getName());
        var customer = customerDao.getCustomerByUserId(userId);
        CustomerReviewsResponse response = customerReviewService.getCustomerReviews(customer.getCustomerId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer addCustomer(@RequestBody Customer customer)
    {
        return customerDao.addCustomer(customer);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateCustomer(@PathVariable int id, @RequestBody Customer customer)
    {
        try
        {
            var currentCustomer = customerDao.getCustomer(id);
            if (currentCustomer == null)
            {
                var error = new HttpError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.toString(), "Customer with id " + id + " is invalid");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body(error);
            }

            if(!currentCustomer.equals(customer))
            {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only edit your own profile!");
            }

            customerDao.updateCustomer(id, customer);
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

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable int id, Customer customer)
    {
        var currentCustomer = customerDao.getCustomer(id);

        if(currentCustomer.equals(customer))
        {
            customerDao.deleteCustomer(id);
        }

    }
}
