import React, { useState, useEffect } from 'react';
import { BreweryContext, BreweryContextType } from '../../contexts/brewery-context/BreweryContext';
import { Brewery } from '../../models/brewery/Brewery';
import BreweryService from '../../services/brewery-service/BreweryService';
import { CustomerReview } from '../../models/customer-review/CustomerReview';

interface Props {
    children: React.ReactNode;
}

export default function BreweryContextProvider({ children }: Props) {
    const [breweries, setBreweries] = useState<Brewery[]>([]);
    const [reviews, setReviews] = useState<CustomerReview[]>([]);

    useEffect(() => {
        fetchBreweries();
    }, []);

    async function fetchBreweries(brewId?: number) {
        try {
            const breweries = await BreweryService.getAllBreweries(brewId);
            setBreweries(breweries);
        } catch (error) {
            console.error('Error getting breweries:', error);
        }
    }

    async function addBrewery(brewery: Brewery) {
        try {
            const newBrewery = await BreweryService.addBrewery(brewery);
            setBreweries((prevBreweries) => [...prevBreweries, newBrewery]);
        } catch (error) {
            console.error('Error adding brewery:', error);
        }
    }

    async function updateBrewery(brewery: Brewery) {
        try {
            await BreweryService.updateBrewery(brewery);
            setBreweries((prevBreweries) =>
                prevBreweries.map((b) => (b.breweryId === brewery.breweryId ? brewery : b))
            );
        } catch (error) {
            console.error('Error updating brewery:', error);
        }
    }

    async function deleteBrewery(breweryId: string) {
        try {
            await BreweryService.deleteBrewery(breweryId);
            setBreweries((prevBreweries) =>
                prevBreweries.filter((b) => b.breweryId !== breweryId)
            );
        } catch (error) {
            console.error('Error deleting brewery:', error);
        }
    }

    async function refreshBreweries() {
        await fetchBreweries();
    }

    const contextValue: BreweryContextType = {
        breweries,
        addBrewery,
        updateBrewery,
        deleteBrewery,
        refreshBreweries,
        fetchBreweries,
    };

    return <BreweryContext.Provider value={contextValue}>{children}</BreweryContext.Provider>;
}
