import React from 'react';
import { Brewer } from '../../models/brewer/Brewer';
import { Brewery } from '../../models/brewery/Brewery';

export interface AdminContextType {
    brewers: any[];
    breweries: any[];
    customers: any[];
    addBrewer: (brewer: Brewer) => Promise<void>;
    addBrewery: (brewery: Brewery) => Promise<void>;
    updateBrewer: (brewer: Brewer) => Promise<void>;
    deleteBrewer: (brewerId: number) => Promise<void>;
    refreshBrewers: () => Promise<void>;
    refreshBreweries: () => Promise<void>;
}

export const AdminContext = React.createContext<AdminContextType | undefined>(undefined);