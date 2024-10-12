package com.niantic.data;

import com.niantic.models.Brewery;
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
import java.util.UUID;

@Repository
public class MySqlBreweryDao implements BreweryDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlBreweryDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Brewery> getBreweries() {
        List<Brewery> breweries = new ArrayList<>();

        String sql = """
                SELECT *
                FROM Brewery
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql);

        while (row.next()) {
            String breweryId = row.getString("brewery_id");
            String breweryName = row.getString("brewery_name");
            String breweryType = row.getString("brewery_type");
            String address = row.getString("address");
            String city = row.getString("city");
            String stateProvince = row.getString("state_province");
            String postalCode = row.getString("postal_code");
            String country = row.getString("country");
            Double longitude = row.getDouble("longitude");
            Double latitude = row.getDouble("latitude");
            String phone = row.getString("phone");
            String webSiteUrl = row.getString("website_url");
            int brewerId = row.getInt("brewer_id");


            Brewery brewery = new Brewery(breweryId, breweryName, breweryType, address, city, stateProvince, postalCode, country, longitude, latitude, phone, webSiteUrl, brewerId);


            breweries.add(brewery);
        }
        return breweries;
    }


    @Override
    public Brewery getBreweryById(String id) {
        Brewery brewery = null;

        String sql = """
            SELECT *
            FROM Brewery
            WHERE brewery_id = ?
            """;

        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, id);

        if (rowSet.next()) {
            String breweryId = rowSet.getString("brewery_id");
            String breweryName = rowSet.getString("brewery_name");
            String breweryType = rowSet.getString("brewery_type");
            String address = rowSet.getString("address");
            String city = rowSet.getString("city");
            String stateProvince = rowSet.getString("state_province");
            String postalCode = rowSet.getString("postal_code");
            String country = rowSet.getString("country");
            Double longitude = rowSet.getDouble("longitude");
            Double latitude = rowSet.getDouble("latitude");
            String phone = rowSet.getString("phone");
            String webSiteUrl = rowSet.getString("website_url");
            int brewerId = rowSet.getInt("brewer_id");

            brewery = new Brewery(breweryId, breweryName, breweryType, address, city, stateProvince, postalCode, country, longitude, latitude, phone, webSiteUrl, brewerId);
        }

        return brewery;
    }

    @Override
    public List<Brewery> getBreweryByBrewerId(int id) {
        List<Brewery> breweries = new ArrayList<>();

        String sql = """
                SELECT *
                FROM Brewery
                WHERE brewer_id = ?
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, id);

        while(row.next())
        {
            String breweryId = row.getString("brewery_id");
            String breweryName = row.getString("brewery_name");
            String breweryType = row.getString("brewery_type");
            String address = row.getString("address");
            String city = row.getString("city");
            String stateProvince = row.getString("state_province");
            String postalCode = row.getString("postal_code");
            String country = row.getString("country");
            Double longitude = row.getDouble("longitude");
            Double latitude = row.getDouble("latitude");
            String phone = row.getString("phone");
            String webSiteUrl = row.getString("website_url");
            int brewerId = row.getInt("brewer_id");

            Brewery brewery = new Brewery(breweryId, breweryName, breweryType, address, city, stateProvince, postalCode, country, longitude, latitude, phone, webSiteUrl, brewerId);
            breweries.add(brewery);
        }
        return breweries;
    }

    @Override
    public Brewery addBrewery(Brewery brewery) {
        String sql = """
                INSERT INTO Brewery (brewery_name, brewery_type, address, city, state_province, postal_code, country, longitude, latitude, phone, website_url, brewer_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;

        UUID newBreweryId = UUID.randomUUID();

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, brewery.getBreweryName());
            statement.setString(2, brewery.getBreweryType());
            statement.setString(3, brewery.getAddress());
            statement.setString(4, brewery.getCity());
            statement.setString(5, brewery.getStateProvince());
            statement.setString(6, brewery.getPostalCode());
            statement.setString(7, brewery.getCountry());
            statement.setDouble(8, brewery.getLongitude());
            statement.setDouble(9, brewery.getLatitude());
            statement.setString(10, brewery.getPhone());
            statement.setString(11, brewery.getWebsiteUrl());
            statement.setInt(12, brewery.getBrewerId());

            return statement;
        }, keyHolder);

        return getBreweryById(newBreweryId.toString());
    }


    @Override
    public void updateBrewery(String id, Brewery brewery) {
        String sql = """
                UPDATE Brewery
                SET brewery_name = ?,
                    brewery_type = ?,
                    address = ?,
                    city = ?,
                    state_province = ?,
                    postal_code = ?,
                    country = ?,
                    longitude = ?,
                    latitude = ?,
                    phone = ?,
                    website_url = ?,
                    brewer_id = ?
                WHERE brewery_id = ?
                """;

        jdbcTemplate.update(sql,
                brewery.getBreweryName(),
                brewery.getBreweryType(),
                brewery.getAddress(),
                brewery.getCity(),
                brewery.getStateProvince(),
                brewery.getPostalCode(),
                brewery.getCountry(),
                brewery.getLongitude(),
                brewery.getLatitude(),
                brewery.getPhone(),
                brewery.getWebsiteUrl(),
                brewery.getBrewerId(),
                id
        );
    }

    @Override
    public void deleteBrewery(String id) {
        String sql = """
                DELETE FROM Brewery
                WHERE brewery_id = ?
                """;

        jdbcTemplate.update(sql, id);
    }

}

