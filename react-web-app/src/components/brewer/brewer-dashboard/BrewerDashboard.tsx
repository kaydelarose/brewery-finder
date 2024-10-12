import { useContext } from "react";
import { Link } from "react-router-dom";
import { BreweryContext } from "../../../contexts/brewery-context/BreweryContext";
import { Brewery } from "../../../models/brewery/Brewery";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import brewerImage from '../../../assets/images/brewer-dashboard1.png'
import brewerProfile from '../../../assets/images/brewer-profile.png'
import './BrewerDashboard.css';

export default function BrewerDashboard() {

    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)
    const brewerId = user?.brewerId

    const breweryContext = useContext(BreweryContext);
    if (!breweryContext) {
        throw new Error('Sorry, this is not within the BreweryContextProvider')
    }

    if (!isAuthenticated) {
        throw new Error('Sorry, authenitcation needed')
    }

    const { breweries } = breweryContext

    const breweriesOwned = breweries.filter((b: Brewery) => b.brewerId == +(brewerId ?? 0))

    return (

        <>
            <div className="brewer-img">
                <img src={brewerImage} className="brewer-dash-img" />
            </div>
            <div className="brewer-profile-page container mt-5">
                <div className="brewer-profile-container">
                    <div className="brewer-profile-image-container">
                        <img src={brewerProfile} className="brewer-profile-image" alt="Brewer Profile" />
                    </div>
                    <div className="brewer-account-info-container card form-control">
                        <h1>Welcome to the Brewer Dashboard, {user?.username}!</h1>
                        <h4>Account information:</h4>
                        <p><strong>User Id: </strong>{user?.id}</p>
                        <p><strong>Brewer Id: </strong>{user?.brewerId}</p>
                    </div>
                </div>

                <div className="container-owned">
                    <ul className="brewer-breweries-container form-control mt-3">
                        <h4>Your Breweries:</h4>
                        {breweriesOwned.map((brewery: Brewery) => (
                            <li className="brewery-card form-control shadow p-3 mb-3 bg-white rounded" key={brewery.breweryId}>
                                <strong>{brewery.breweryName}</strong>
                                <Link to={`/brewers/${brewery.breweryId}/edit`} className="brewer-edit-button shadow">Edit Brewery</Link>
                            </li>
                        ))}
                        <Link to={"/brewers/add"} className="brewer-button-add shadow mb-3">Add Brewery</Link>
                    </ul>
                </div>
            </div>
        </>
    );
}