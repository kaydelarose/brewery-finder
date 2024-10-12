import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { BreweryContext } from "../../../contexts/brewery-context/BreweryContext";
import breweryService from "../../../services/brewery-service/BreweryService";
import { Brewery } from "../../../models/brewery/Brewery";
import '../edit-brewery/EditBrewery.css'

export default function EditBrewery() {

    const navigate = useNavigate();

    const location = useParams();
    const breweryId = location.breweryId
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)
    const id = user?.brewerId;

    const breweryContext = useContext(BreweryContext)
    const [message, setMessage] = useState<string | null>(null);

    if (!breweryContext) {
        throw new Error("No Brewer Context Found")
    }
    if (!isAuthenticated) {
        throw new Error("You do not have proper credentials")
    }

    const [brewery, setBrewery] = useState<Brewery>
        ({

            breweryId: '',
            breweryName: '',
            breweryType: '',
            address: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            country: '',
            longitude: 1,
            latitude: 1,
            phone: '',
            websiteUrl: '',
            brewerId: id

        })

    async function loadBrewery() {
        const brewery = await breweryService.getBreweryById(breweryId ?? '')
        if (brewery) {
            setBrewery(brewery)
        }
        else {
            setMessage("Brewery Not Found :(")
        }
    }

    useEffect(() => {
        if (breweryId) {
            loadBrewery();
        }
    }, [])

    const { updateBrewery } = breweryContext;

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
            const updatedPub = await updateBrewery(brewery);
            setMessage('You\'ve successfully edited brewery!')
            navigate('/brewers');

        } catch (error) {
            console.error('Error editing this brewery', error);
            setMessage('Sorry, an Error occurred editing this brewery')
        }
    }

    return (
        <>
            <div className="container mt-5">
                <h6><strong>{message}</strong></h6>

                <h4>Edit Brewery: </h4>
                <form onSubmit={handleSubmit} method="put">
                    <div className="row">
                        <label htmlFor="breweryName">Brewery Name: </label>
                        <input type="text"
                            className="form-control "
                            name="breweryName"
                            id="breweryName"
                            defaultValue={brewery.breweryName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="breweryType">Brewery Type:</label>
                        <input type="text"
                            className="form-control"
                            name="breweryType"
                            id="breweryType"
                            defaultValue={brewery.breweryType}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="address">Address:</label>
                        <input type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            defaultValue={brewery.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="city">City:</label>
                        <input type="text"
                            className="form-control"
                            name="city"
                            id="city"
                            defaultValue={brewery.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="stateProvince">State/Province:</label>
                        <input type="text"
                            className="form-control"
                            name="stateProvince"
                            id="stateProvince"
                            defaultValue={brewery.stateProvince}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="postalCode">Postal code:</label>
                        <input type="text"
                            className="form-control"
                            name="postalCode"
                            id="postalCode"
                            defaultValue={brewery.postalCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="country">Country:</label>
                        <input type="text"
                            className="form-control"
                            name="country"
                            id="country"
                            defaultValue={brewery.country}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="text"
                            className="form-control"
                            name="phone"
                            defaultValue={brewery.phone}
                            id="phone"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="websiteUrl">Website/URL:</label>
                        <input type="text"
                            className="form-control"
                            name="websiteUrl"
                            defaultValue={brewery.websiteUrl}
                            id="websiteUrl"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="brewer-button-edit shadow" type="submit">Edit Brewery</button>
                    <Link className="brewer-button-cancel shadow" to="/brewers"> Cancel</Link>
                </form>
            </div>
        </>
    )

}