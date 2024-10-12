import { Link } from "react-router-dom";
import './Home.css';
import heroImage from '../../assets/images/homepage-image.jpg';
import introImage from '../../assets/images/beer-gathering.jpg';

export default function Home() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <img src={heroImage} alt="Hero" className="hero-image" />
                <div className="overlay-content">
                    <div className="hero-header-body">
                        <h1>Find a Brewery Now!</h1>
                        <Link to="/breweries" className="find-brewery-button">Explore Breweries</Link>
                    </div>
                </div>
            </div>

            <div className="intro-container">
                <h2>Welcome to getTapped</h2>
                <p>
                    getTapped is your ultimate brewery finder. Whether you're a beer enthusiast or just
                    starting your brewery journey, getTapped helps you discover the best breweries, craft beers, and experiences 
                    across the country. Our platform partners with top breweries to give you an inside look at their offerings, locations, 
                    and events. Explore breweries, plan visits, and track your beer tasting adventures all in one place.
                </p>
                <img src={introImage} alt="Intro" className="intro-image" />
            </div>
        </div>
    );
}
