import React, { useState, useContext } from 'react';
import { BreweryContext } from '../../../contexts/brewery-context/BreweryContext';
import { Brewery } from '../../../models/brewery/Brewery';

export default function BreweryForm() {

    const breweryContext = useContext(BreweryContext);

    const [brewery, setBrewery] = useState<Brewery>({

        breweryId: '',
        breweryName: '',
        breweryType: '',
        address: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
        longitude: 0,
        latitude: 0,
        phone: '',
        websiteUrl: '',
        brewerId: 0
    });

    const [formMessage, setFormMessage] = useState<string | null>(null);

    if (!breweryContext) {

        return <div>Error: Brewery context is not available</div>;
    }

    const { addBrewery, updateBrewery } = breweryContext;

    async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setBrewery({
            ...brewery,
            [name]: value
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            if (brewery.breweryId) {
                await updateBrewery(brewery);
                setFormMessage('Brewery updated successfully!');
            } else {
                await addBrewery(brewery);
                setFormMessage('Brewery added successfully!');
            }

            setBrewery({
                breweryId: '',
                breweryName: '',
                breweryType: '',
                address: '',
                city: '',
                stateProvince: '',
                postalCode: '',
                country: '',
                longitude: 0,
                latitude: 0,
                phone: '',
                websiteUrl: '',
                brewerId: 0
            });
        } catch (error) {
            console.error('Error submitting brewery form:', error);
            setFormMessage('Error submitting brewery form.');
        }
    }

    
    return (
        <>
            {formMessage && <p>{formMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Brewery Name:</label>
                    <input
                        type="text"
                        name="breweryName"
                        value={brewery.breweryName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Brewery Type:</label>
                    <input
                        type="text"
                        name="breweryType"
                        value={brewery.breweryType}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={brewery.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={brewery.city}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>State/Province:</label>
                    <input
                        type="text"
                        name="stateProvince"
                        value={brewery.stateProvince}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Postal Code:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={brewery.postalCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={brewery.country}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Longitude:</label>
                    <input
                        type="number"
                        name="longitude"
                        value={brewery.longitude}
                        step="0.0001"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Latitude:</label>
                    <input
                        type="number"
                        name="latitude"
                        value={brewery.latitude}
                        step="0.0001"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={brewery.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Website URL:</label>
                    <input
                        type="text"
                        name="websiteUrl"
                        value={brewery.websiteUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">
                    {brewery.breweryId ? 'Update Brewery' : 'Add Brewery'}
                </button>
            </form>
        </>
    );
}
