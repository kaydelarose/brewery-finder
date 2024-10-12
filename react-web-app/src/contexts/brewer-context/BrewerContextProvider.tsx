import React, { useEffect, useState } from "react";
import { Brewer } from "../../models/brewer/Brewer";
import brewerService from "../../services/brewer-service/BrewerService";
import { BrewerContext, BrewerContextType } from "./BrewerContext";


interface Props {
    children: React.ReactNode;
}

export default function BrewerContextProvider({ children }: Props) {

 
    const [brewers, setBrewers] = useState<Brewer[]>([]);
    const [brewer, setBrewer] = useState<Brewer>()


    useEffect(() => {
        fetchBrewers()
    }, []);

    async function fetchBrewers() {
        try {
            const brewers = await brewerService.getBrewers()
            setBrewers(brewers)
        }
        catch (error) {
            console.error('Error getting brewers: ', error)
        }
    }

    async function getBrewer(brewerId: number) {
        try {
            const brewer = await brewerService.getBrewerById(brewerId)
            setBrewer(brewer)
        }
        catch (error) {
            console.error('Error getting brewer:', error)
        }

    }

    async function addBrewer(brewer: Brewer) {
        try {
            const newBrewer = await brewerService.addBrewer(brewer)

            setBrewers(prevBrewers => [...prevBrewers, newBrewer])
        }
        catch (error) {
            console.error('Error adding brewer: ', error)
        }

    }

    async function updateBrewer(brewer: Brewer) {
        try {
            await brewerService.updateBrewer(brewer)
            setBrewers((prevBrewer) =>
                prevBrewer.map(b => (b.brewerId === brewer.brewerId ? brewer : b))
            );
        }
        catch (error) {
            console.error('Error updating brewer: ', error)
        }
    };

    async function deleteBrewer(brewerId: number) {
        try {
            await brewerService.deleteBrewer(brewerId)

            setBrewers(prevBrewers => prevBrewers.filter(brewer => brewer.brewerId !== brewerId));
        }
        catch (error) {
            console.error('Error deleting brewer: ', error)
        }
    };

    async function refreshBrewers() {
        await fetchBrewers()

    };

    const contextValue: BrewerContextType = {
        brewers,
        getBrewer,
        addBrewer,
        updateBrewer,
        deleteBrewer,
        refreshBrewers,
        fetchBrewers,
    };

    return <BrewerContext.Provider value={contextValue}>{children}</BrewerContext.Provider>







}