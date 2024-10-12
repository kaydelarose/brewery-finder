package com.niantic.data;

import com.niantic.models.Customer;

import java.util.List;

public interface CustomerDao {

    List<Customer> getCustomers();

    Customer getCustomer(int id);

    Customer getCustomerByUserId(int userId);

    Customer addCustomer(Customer Customer);

    void updateCustomer(int id, Customer Customer);

    void deleteCustomer(int id);
}
