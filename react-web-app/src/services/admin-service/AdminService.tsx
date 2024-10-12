
import axios from "axios";
import { Brewer } from "../../models/brewer/Brewer";
import { Brewery } from "../../models/brewery/Brewery";

class AdminDashboard {
    
    brewersBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/brewers`;
    breweriesBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/breweries`;

   
    async getBrewers(): Promise<Brewer[]> {
        const response = await axios.get<Brewer[]>(this.brewersBaseUrl);
        return response.data;
    }

    async getBrewerById(id: number): Promise<Brewer> {
        const response = await axios.get(`${this.brewersBaseUrl}/${id}`);
        return response.data;
    }

    async addBrewer(brewer: Brewer): Promise<Brewer> {
        const response = await axios.post<Brewer>(this.brewersBaseUrl, brewer);
        return response.data;
    }

    async updateBrewer(brewer: Brewer): Promise<void> {
        const url = `${this.brewersBaseUrl}/${brewer.brewerId}`;
        await axios.put<void>(url, brewer);
    }

    async deleteBrewer(id: number): Promise<void> {
        const url = `${this.brewersBaseUrl}/${id}`;
        await axios.delete<void>(url);
    }

    
    async getBreweries(): Promise<Brewery[]> {
        const response = await axios.get<Brewery[]>(this.breweriesBaseUrl);
        return response.data;
    }

    async getBreweryById(id: number): Promise<Brewery> {
        const response = await axios.get(`${this.breweriesBaseUrl}/${id}`);
        return response.data;
    }

    async addBrewery(brewery: Brewery): Promise<Brewery> {
        const response = await axios.post<Brewery>(this.breweriesBaseUrl, brewery);
        return response.data;
    }

    async updateBrewery(brewery: Brewery): Promise<void> {
        const url = `${this.breweriesBaseUrl}/${brewery.breweryId}`;
        await axios.put<void>(url, brewery);
    }

    async deleteBrewery(id: number): Promise<void> {
        const url = `${this.breweriesBaseUrl}/${id}`;
        await axios.delete<void>(url);
    }
}


const adminDashboard = new AdminDashboard();
export default adminDashboard;
