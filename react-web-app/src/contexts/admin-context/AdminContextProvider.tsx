import React, { useState, useEffect, useMemo } from 'react';
import { AdminContext, AdminContextType } from './AdminContext';
import { Brewer } from '../../models/brewer/Brewer';
import { Brewery } from '../../models/brewery/Brewery';
import brewerService from '../../services/brewer-service/BrewerService';
import breweryService from '../../services/brewery-service/BreweryService';
import { useLocation } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

export default function AdminContextProvider({ children }: Props) {
    const [brewers, setBrewers] = useState<Brewer[]>([]);
    const [breweries, setBreweries] = useState<Brewery[]>([]);
    const [page, setPage] = useState<number>(1);
    const [prevPage, setPrevPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<number>(2);

    const location = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    // UseEffect to fetch data when the page changes
    useEffect(() => {
        const currentPage = +(searchParams.get('page') || '1');
        setPage(currentPage);
        setPrevPage(currentPage - 1);
        setNextPage(currentPage + 1);
        fetchBrewers();
        fetchBreweries();
    }, [page, searchParams]);

    // Fetch brewers
    async function fetchBrewers() {
        try {
            const brewers = await brewerService.getBrewers(page);
            setBrewers(brewers);
        } catch (error) {
            console.error('Error getting brewers:', error);
        }
    }

    // Fetch breweries
    async function fetchBreweries() {
        try {
            const breweries = await breweryService.getBreweries(page);
            setBreweries(breweries);
        } catch (error) {
            console.error('Error getting breweries:', error);
        }
    }

    // Add a new brewer
    async function addBrewer(brewer: Brewer) {
        try {
            const newBrewer = await brewerService.addBrewer(brewer);
            setBrewers((prevBrewers) => [...prevBrewers, newBrewer]);
        } catch (error) {
            console.error('Error adding brewer:', error);
        }
    }

    // Add a new brewery
    async function addBrewery(brewery: Brewery) {
        try {
            const newBrewery = await breweryService.addBrewery(brewery);
            setBreweries((prevBreweries) => [...prevBreweries, newBrewery]);
        } catch (error) {
            console.error('Error adding brewery:', error);
        }
    }

    // Update an existing brewer
    async function updateBrewer(brewer: Brewer) {
        try {
            await brewerService.updateBrewer(brewer);
            setBrewers((prevBrewers) =>
                prevBrewers.map((b) => (b.brewerId === brewer.brewerId ? brewer : b))
            );
        } catch (error) {
            console.error('Error updating brewer:', error);
        }
    }

    // Delete a brewer
    async function deleteBrewer(brewerId: number) {
        try {
            await brewerService.deleteBrewer(brewerId);
            setBrewers((prevBrewers) => prevBrewers.filter((b) => b.brewerId !== brewerId));
        } catch (error) {
            console.error('Error deleting brewer:', error);
        }
    }

    // Refresh brewers and breweries
    async function refreshBrewers() {
        await fetchBrewers();
    }

    async function refreshBreweries() {
        await fetchBreweries();
    }

    // Set page number for pagination
    function setPageNumber(page: number) {
        setPage(page);
        setPrevPage(page - 1);
        setNextPage(page + 1);
    }

    const contextValue: AdminContextType = {
        brewers,
        breweries,
        page,
        prevPage,
        nextPage,
        setPageNumber,
        addBrewer,
        addBrewery,
        updateBrewer,
        deleteBrewer,
        refreshBrewers,
        refreshBreweries,
    };

    return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
}
