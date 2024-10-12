import React from "react";
import { Brewer } from "../../models/brewer/Brewer";

export interface BrewerContextType{
    brewers: Brewer[];
    addBrewer: (brewer: Brewer) => Promise<void>;
    updateBrewer: (brewer:Brewer) => Promise<void>;
    deleteBrewer: (brewerId: number) => Promise<void>;
    refreshBrewers: () => Promise<void>;
    fetchBrewers:() =>Promise<void>;
    getBrewer:(brewerId:number) => Promise<void>;
    
}

export const BrewerContext = React.createContext<BrewerContextType | undefined>(undefined);