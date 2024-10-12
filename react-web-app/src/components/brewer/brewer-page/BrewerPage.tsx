import { Outlet } from "react-router-dom";
import BrewerContextProvider from "../../../contexts/brewer-context/BrewerContextProvider";
import BreweryContextProvider from "../../../contexts/brewery-context/BreweryContextProvider";

export default function BrewerPage() {

    return (

        <BreweryContextProvider>
            <BrewerContextProvider>
                <Outlet />
            </BrewerContextProvider>
        </BreweryContextProvider>
    )
}