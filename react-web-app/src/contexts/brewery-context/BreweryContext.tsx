import React, { createContext, useState, useEffect } from 'react';
import { Brewery } from '../../models/brewery/Brewery';


export interface BreweryContextType {

    breweries: Brewery[];
    addBrewery: (brewery: Brewery) => Promise<void>;
    updateBrewery: (brewery: Brewery) => Promise<void>;
    deleteBrewery: (breweryId: string) => Promise<void>;
    refreshBreweries: () => Promise<void>;
    fetchBreweries: (brewId?: number) => Promise<void>;
}

export const BreweryContext = React.createContext<BreweryContextType | undefined>(undefined);