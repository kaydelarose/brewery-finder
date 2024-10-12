import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brewery } from "../../../models/brewery/Brewery";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import addPic from '../../../assets/images/brewer.png'
import { BreweryContext } from "../../../contexts/brewery-context/BreweryContext";
import '../add-brewery/AddBrewery.css'

export default function AddBrewery() {
    const navigate = useNavigate();
    const breweryContext = useContext(BreweryContext)
    const [message, setMessage] = useState<string | null>(null)

    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)
    const id = user?.brewerId

    if (!breweryContext) {
        throw new Error('No Brewery Context found')
    }
    if (!isAuthenticated) {
        throw new Error("You do not have proper credentials")
    }

    const newBrewery = new Brewery()
    newBrewery.brewerId = id;
    const [brewery, setBrewery] = useState<Brewery>(newBrewery)

    const { addBrewery, refreshBreweries } = breweryContext;

    async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {

        const { name, value } = e.target;
        setBrewery({
            ...brewery,
            [name]: name === "longitude" || name === "latitude" || name === "brewerId" ? +value : value
        });

    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const updatedPub = await addBrewery(brewery);
            setMessage('You\'ve successfully edited brewery!')

            const clearForm = new Brewery();
            clearForm.brewerId = id;
            setBrewery(clearForm);

            navigate('/brewers');
            refreshBreweries();

        } catch (error) {
            console.error('Error editing this brewery', error);
            setMessage('Sorry, an Error occurred editing this brewery')
        }
    }

    return (
        <>
            <div className="brewer-img">
                <img src={addPic} className="brewer-img" />
            </div>
            <div className="container mb-3 mt-3 mb-3">
                <h6><strong>{message}</strong></h6>
                <h2>Add New Brewery</h2>
                <form onSubmit={handleSubmit} method="post">
                    <div className="row">
                        <label htmlFor="breweryName">Brewery Name: </label>
                        <input type="text"
                            className="form-control"
                            name="breweryName"
                            id="breweryName"
                            value={brewery.breweryName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="breweryType">Brewery Type:</label>
                        <input type="text"
                            className="form-control"
                            name="breweryType"
                            value={brewery.breweryType}
                            id="breweryType"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="address">Address:</label>
                        <input type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            value={brewery.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="city">City:</label>
                        <input type="text"
                            className="form-control"
                            name="city"
                            id="city"
                            value={brewery.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="stateProvince">State/Province:</label>
                        <input type="text"
                            className="form-control"
                            name="stateProvince"
                            id="stateProvince"
                            value={brewery.stateProvince}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="postalCode">Postal code:</label>
                        <input type="text"
                            className="form-control"
                            name="postalCode"
                            id="postalCode"
                            value={brewery.postalCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="country">Country:</label>
                        <input type="text"
                            className="form-control"
                            name="country"
                            id="country"
                            value={brewery.country}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="text"
                            className="form-control"
                            name="phone"
                            value={brewery.phone}
                            id="phone"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="websiteUrl">Website/URL:</label>
                        <input type="text"
                            className="form-control"
                            name="websiteUrl"
                            value={brewery.websiteUrl}
                            id="websiteUrl"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn-add shadow " type="submit">Add Brewery</button>
                    <Link className="btn-cancel shadow" to="/brewers"> Cancel</Link>

                </form>

            </div>
        </>
    )

}