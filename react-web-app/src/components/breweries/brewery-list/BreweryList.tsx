import { useContext } from "react";
import { Link } from "react-router-dom";
import { BreweryContext } from '../../../contexts/brewery-context/BreweryContext';
import { Brewery } from '../../../models/brewery/Brewery';
import './BreweryList.css';
import breweryImage from '../../../assets/images/brewery-page.jpg';

export default function BreweryList() {
    const context = useContext(BreweryContext);

    if (!context) {
        throw new Error('BreweryList must be used within a BreweryContextProvider');
    }

    const { breweries } = context;

    return (
        <>
            <div className="breweries-hero-section">
                <img src={breweryImage} alt="Brewery" className="brewery-hero-image" />
            </div>


            <div className="brewery-card-container">
            <div className="breweries-intro">
                <h2>Explore Our Partner Breweries</h2>
                <p>We partner with various breweries across the country to bring you the finest selections of craft beer. 
                Each brewery offers a unique taste, experience, and passion for their craft. Dive into the world of brews by exploring 
                the details of each brewery listed below, and plan your next visit!</p>
            </div>
                <ul className="brewery-list">
                    {breweries.map((brewery: Brewery) => (
                        <li key={brewery.breweryId} className="brewery-card">
                            <div className="brewery-card-content">
                                <h3>{brewery.breweryName}</h3>
                                <p>{brewery.city}, {brewery.stateProvince}</p>
                                <Link to={`/breweries/${brewery.breweryId}`} className="view-details-link">
                                    View Details
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
