package com.niantic.data;

import com.niantic.models.CustomerFavorites;
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
public class MySqlCustomerFavoritesDao implements CustomerFavoritesDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlCustomerFavoritesDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<CustomerFavorites> getCustomerFavorites() {
        List<CustomerFavorites> favorites = new ArrayList<>();
        String sql = """
                SELECT favorite_id
                     , customer_id
                     , brewery_id
                 FROM CustomerFavorites;
                """;

        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql);
        while (rowSet.next()) {
            CustomerFavorites favorite = mapRowToCustomerFavorite(rowSet);
            favorites.add(favorite);
        }
        return favorites;
    }

    @Override
    public CustomerFavorites getCustomerFavorite(int favoriteId) {
        return null;
    }

    @Override
    public CustomerFavorites getCustomerFavoriteById(int id) {
        String sql = """
                SELECT favorite_id
                     , customer_id
                     , brewery_id
                 FROM CustomerFavorites
                 WHERE favorite_id = ?;
                """;
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, id);
        if (rowSet.next()) {
            return mapRowToCustomerFavorite(rowSet);
        }
        return null;
    }

    @Override
    public List<CustomerFavorites> getFavoritesByCustomerId(int customerId) {
        List<CustomerFavorites> favorites = new ArrayList<>();
        String sql = """
                SELECT favorite_id
                     , customer_id
                     , brewery_id
                 FROM CustomerFavorites
                 WHERE customer_id = ?;
                """;
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, customerId);
        while (rowSet.next()) {
            CustomerFavorites favorite = mapRowToCustomerFavorite(rowSet);
            favorites.add(favorite);
        }
        return favorites;
    }

    @Override
    public List<CustomerFavorites> getFavoritesByBreweryId(String breweryId) {
        List<CustomerFavorites> favorites = new ArrayList<>();
        String sql = """
                SELECT favorite_id
                     , customer_id
                     , brewery_id
                 FROM CustomerFavorites
                 WHERE brewery_id = ?;
                """;
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, breweryId);
        while (rowSet.next()) {
            CustomerFavorites favorite = mapRowToCustomerFavorite(rowSet);
            favorites.add(favorite);
        }
        return favorites;
    }

    @Override
    public CustomerFavorites addCustomerFavorite(CustomerFavorites customerFavorite) {
        String sql = """
                INSERT INTO CustomerFavorites (customer_id, brewery_id)
                VALUES (?, ?);
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, customerFavorite.getCustomerId());
            statement.setString(2, customerFavorite.getBreweryId());
            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();
        return getCustomerFavoriteById(newId);
    }

    @Override
    public void updateCustomerFavorite(int id, CustomerFavorites customerFavorite) {
        String sql = """
                UPDATE CustomerFavorites
                SET customer_id = ?, brewery_id = ?
                WHERE favorite_id = ?;
                """;

        jdbcTemplate.update(sql,
                customerFavorite.getCustomerId(),
                customerFavorite.getBreweryId(),
                id);
    }

    @Override
    public void deleteCustomerFavorite(int id) {
        String sql = """
                DELETE FROM CustomerFavorites
                WHERE favorite_id = ?;
                """;
        jdbcTemplate.update(sql, id);
    }

    private CustomerFavorites mapRowToCustomerFavorite(SqlRowSet rowSet) {
        int favoriteId = rowSet.getInt("favorite_id");
        int customerId = rowSet.getInt("customer_id");
        String breweryId = rowSet.getString("brewery_id");
        return new CustomerFavorites(favoriteId, customerId, breweryId);
    }
}

