package com.niantic.data;

import com.niantic.models.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MySqlCustomerDao implements CustomerDao
{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlCustomerDao(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<Customer> getCustomers() {

        List<Customer> customers = new ArrayList<>();

        String sql = """
                SELECT customer_id,
                    favorite_breweries,
                    total_reviews,
                    user_id
                FROM Customer
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql);

        while(row.next())
        {
            int customerId = row.getInt("customer_id");
            String favoriteBreweries = row.getString("favorite_breweries");
            int totalReviews = row.getInt("total_reviews");
            int userId = row.getInt("user_id");

            Customer customer = new Customer(customerId, favoriteBreweries, totalReviews, userId);

            customers.add(customer);
        }

        return customers;
    }

    @Override
    public Customer getCustomer(int customerId) {

        Customer customer = null;

        String sql = """
                SELECT customer_id,
                    favorite_breweries,
                    total_reviews,
                    user_id
                FROM Customer
                WHERE customer_id = ?
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, customerId);

        if(row.next())
        {
            String favoriteBreweries = row.getString("favorite_breweries");
            int totalReviews = row.getInt("total_reviews");
            int userId = row.getInt("user_id");

            customer = new Customer(customerId, favoriteBreweries, totalReviews, userId);
        }
        return customer;
    }

    @Override
    public Customer getCustomerByUserId(int userId) {

        Customer customer = null;

        String sql = """
                SELECT customer_id,
                    favorite_breweries,
                    total_reviews,
                    user_id
                FROM Customer AS c
                WHERE user_id = ?
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, userId);

        if(row.next())
        {
            String favoriteBreweries = row.getString("favorite_breweries");
            int totalReviews = row.getInt("total_reviews");
            int customerId = row.getInt("customer_id");

            customer = new Customer(customerId, favoriteBreweries, totalReviews, userId);
        }
        return customer;
    }

    @Override
    public Customer addCustomer(Customer customer) {
        String sql = """
                INSERT INTO customers(favorite_breweries, total_reviews, user_id)
                VALUES(?, ?, ?)
                """;

        // insert a new record and retrieve the generated id
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, customer.getFavoriteBreweries());
            statement.setInt(2, customer.getTotalReviews());
            statement.setInt(3, customer.getUserId());

            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();

        return getCustomer(newId);
    }

    @Override
    public void updateCustomer(int id, Customer customer) {
        String sql = """
                UPDATE Customers
                SET favorite_breweries = ?,
                    total_reviews = ?,
                    user_id = ?
                WHERE customer_id = ?
                """;

        jdbcTemplate.update(sql,
                customer.getFavoriteBreweries(),
                customer.getTotalReviews(),
                customer.getUserId());
    }

    @Override
    public void deleteCustomer(int id) {
        String sql = """
                DELETE FROM Customers
                WHERE customer_id = ?
                """;

        jdbcTemplate.update(sql, id);

    }
}
