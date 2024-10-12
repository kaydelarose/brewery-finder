package com.niantic.data;

import com.niantic.models.Brewer;

import java.util.List;

public interface BrewerDao {

    List<Brewer> getAll();

    Brewer getBrewerByUserId(int userId);

    Brewer getBrewerById(int brewerId);

    Brewer addBrewer(Brewer brewer);

    void updateBrewer(int brewerId, Brewer brewer);

    void deleteBrewer(int brewerId);

}
