package com.niantic.data;

import com.niantic.models.Brewer;
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
public class MySqlBrewerDao implements BrewerDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlBrewerDao(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }


    @Override
    public List<Brewer> getAll() {
        List<Brewer> brewers = new ArrayList<>();

        String sql = """
                SELECT *
                FROM brewer;
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql);

        while (row.next()) {
            int brewerId = row.getInt("brewer_id");
            int breweriesOwned = row.getInt("breweries_owned");
            int userId = row.getInt("user_id");

            Brewer brewer = new Brewer(brewerId, breweriesOwned, userId);

            brewers.add(brewer);
        }
        return brewers;
    }

    @Override
    public Brewer getBrewerById(int brewerId) {
        Brewer brewer = null;

        String sql = """
                SELECT brewer_id,
                    breweries_owned,
                    user_id
                FROM brewer
                WHERE brewer_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, brewerId );

        if (row.next())
        {
            int breweriesOwned = row.getInt("breweries_owned");
            int userId = row.getInt("user_id");

            brewer= new Brewer(brewerId, breweriesOwned, userId);

        }
        return brewer;
    }


    @Override
    public Brewer getBrewerByUserId(int userId) {
        Brewer brewer = null;

        String sql = """
                SELECT brewer_id,
                    breweries_owned,
                    user_id
                FROM brewer
                WHERE user_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, userId );

        if (row.next())
        {
            int breweriesOwned = row.getInt("breweries_owned");
            int brewerId = row.getInt("brewer_id");

            brewer= new Brewer(brewerId, breweriesOwned, userId);

        }
        return brewer;
    }

    @Override
    public Brewer addBrewer(Brewer brewer) {
        String sql = """
                INSERT INTO Brewer (breweries_owned
                             , user_id)
                VALUES (?,?);
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, brewer.getBreweriesOwned());
            statement.setInt(2, brewer.getUserId());
            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();

        return getBrewerById(newId);


    }

    @Override
    public void updateBrewer(int brewerId, Brewer brewer) {
        String sql = """
                UPDATE Brewer
                SET
                breweries_owned = ?
                , user_id = ?
                WHERE brewer_id = ?;
                
                """;

        jdbcTemplate.update(sql
        , brewer.getBreweriesOwned()
        , brewer.getUserId(), brewerId);

    }

    @Override
    public void deleteBrewer(int brewerId) {
        String sql = """
                DELETE FROM brewer WHERE brewer_id = ?;
                """;
        jdbcTemplate.update(sql, brewerId);

    }
}
