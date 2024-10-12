import { Outlet, useNavigate } from "react-router-dom";
import BreweryList from '../../breweries/brewery-list/BreweryList';
import BreweryForm from '../../breweries/brewery-form/BreweryForm';
import BreweryContextProvider from "../../../contexts/brewery-context/BreweryContextProvider";

export default function BreweriesPage() {

    // const navigate = useNavigate();

    // const handleBreweryClick = (breweryId: string) => {
    //     navigate(`/breweries/${breweryId}`);
    // }

    return (
        <BreweryContextProvider>
            
            <Outlet />
        </BreweryContextProvider>
    );
}
