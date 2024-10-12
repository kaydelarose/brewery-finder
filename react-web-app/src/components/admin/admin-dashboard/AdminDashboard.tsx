import { useEffect, useState } from "react";
import breweryService from "../../../services/brewery-service/BreweryService";
import brewerService from "../../../services/brewer-service/BrewerService";
import customerService from "../../../services/customer-service/CustomerService";
import { Brewery } from "../../../models/brewery/Brewery";
import { Brewer } from "../../../models/brewer/Brewer";
import { Customer } from "../../../models/customer/Customer";
import adminProfile from "../../../assets/images/admin-profile.png";
import './AdminDashboard.css';

const AdminPage = () => {
    const [breweries, setBreweries] = useState<Brewery[]>([]);
    const [brewers, setBrewers] = useState<Brewer[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    const [showBreweries, setShowBreweries] = useState(false);
    const [showBrewers, setShowBrewers] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);

    const [loadingBreweries, setLoadingBreweries] = useState(false);
    const [loadingBrewers, setLoadingBrewers] = useState(false);
    const [loadingCustomers, setLoadingCustomers] = useState(false);

    const [errorBreweries, setErrorBreweries] = useState<string | null>(null);
    const [errorBrewers, setErrorBrewers] = useState<string | null>(null);
    const [errorCustomers, setErrorCustomers] = useState<string | null>(null);

    // Fetch breweries
    useEffect(() => {
        if (showBreweries) {
            const fetchBreweries = async () => {
                setLoadingBreweries(true);
                try {
                    const fetchedBreweries = await breweryService.getAllBreweries();
                    setBreweries(fetchedBreweries);
                    setErrorBreweries(null);
                } catch (error) {
                    setErrorBreweries("Error fetching breweries");
                } finally {
                    setLoadingBreweries(false);
                }
            };
            fetchBreweries();
        }
    }, [showBreweries]);

    // Fetch brewers
    useEffect(() => {
        if (showBrewers) {
            const fetchBrewers = async () => {
                setLoadingBrewers(true);
                try {
                    const fetchedBrewers = await brewerService.getBrewers();
                    setBrewers(fetchedBrewers);
                    setErrorBrewers(null);
                } catch (error) {
                    setErrorBrewers("Error fetching brewers");
                } finally {
                    setLoadingBrewers(false);
                }
            };
            fetchBrewers();
        }
    }, [showBrewers]);

    // Fetch customers
    useEffect(() => {
        if (showCustomers) {
            const fetchCustomers = async () => {
                setLoadingCustomers(true);
                try {
                    const fetchedCustomers = await customerService.getCustomers();
                    setCustomers(fetchedCustomers);
                    setErrorCustomers(null);
                } catch (error) {
                    setErrorCustomers("Error fetching customers");
                } finally {
                    setLoadingCustomers(false);
                }
            };
            fetchCustomers();
        }
    }, [showCustomers]);

    return (
        <div className="admin-page">
            {/* Admin Profile Section */}
            <div className="admin-profile-container">
                <div className="admin-profile-section">
                    <img src={adminProfile} alt="Admin Profile" className="admin-profile-image" />
                    <div className="admin-profile-info">
                        <h2>Charletta is the boss!</h2>
                        <p>In charge of keeping everything running smoothly.</p>
                    </div>
                </div>
            </div>
    
            <div className="admin-card-container">
                {/* Manage Breweries Section */}
                <div className="admin-card">
                    <h4>Manage Breweries:</h4>
                    <button
                        className="admin-button"
                        onClick={() => setShowBreweries(!showBreweries)}
                    >
                        {showBreweries ? "Hide All Breweries" : "View All Breweries"}
                    </button>
                </div>
                {showBreweries && (
                    <div className="admin-card">
                        <h4>All Breweries</h4>
                        {loadingBreweries ? (
                            <p>Loading breweries...</p>
                        ) : errorBreweries ? (
                            <p>{errorBreweries}</p>
                        ) : (
                            <ul className="admin-card-content">
                                {breweries.map((brewery) => (
                                    <li key={brewery.breweryId}>
                                        {brewery.breweryName} - {brewery.city}, {brewery.stateProvince}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
    
                {/* Manage Brewers Section */}
                <div className="admin-card">
                    <h4>Manage Brewers:</h4>
                    <button
                        className="admin-button"
                        onClick={() => setShowBrewers(!showBrewers)}
                    >
                        {showBrewers ? "Hide All Brewers" : "View All Brewers"}
                    </button>
                </div>
                {showBrewers && (
                    <div className="admin-card">
                        <h4>All Brewers</h4>
                        {loadingBrewers ? (
                            <p>Loading brewers...</p>
                        ) : errorBrewers ? (
                            <p>{errorBrewers}</p>
                        ) : (
                            <ul className="admin-card-content">
                                {brewers.map((brewer) => (
                                    <li key={brewer.brewerId}>
                                        Brewer ID: {brewer.brewerId} - Breweries Owned: {brewer.breweriesOwned ?? 'N/A'}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
    
                {/* Manage Customers Section */}
                <div className="admin-card">
                    <h4>Manage Customers:</h4>
                    <button
                        className="admin-button"
                        onClick={() => setShowCustomers(!showCustomers)}
                    >
                        {showCustomers ? "Hide All Customers" : "View All Customers"}
                    </button>
                </div>
                {showCustomers && (
                    <div className="admin-card">
                        <h4>All Customers</h4>
                        {loadingCustomers ? (
                            <p>Loading customers...</p>
                        ) : errorCustomers ? (
                            <p>{errorCustomers}</p>
                        ) : (
                            <ul className="admin-card-content">
                                {customers.map((customer) => (
                                    <li key={customer.customerId}>
                                        <div>
                                            <strong>Favorite Breweries:</strong>
                                            <p>{customer.favoriteBreweries ?? "No favorite breweries listed"}</p>
                                        </div>
                                        <p>
                                            <strong>Total Reviews:</strong> {customer.totalReviews}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPage;
