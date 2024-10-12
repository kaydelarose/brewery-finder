import axios from "axios";
import { Brewery } from '../../models/brewery/Brewery';
import { CustomerReview } from "../../models/customer-review/CustomerReview";
import BaseService from "../base-service";

class BreweryService extends BaseService {

    baseUrl = `${import.meta.env.VITE_API_BASE_URL}/breweries`

    async getAllBreweries(brewId?: number): Promise<Brewery[]> {

        const headers = this.createHeaders();
        headers.params = { brewId: brewId ? { brewId } : {} };

        const response = await axios.get<Brewery[]>(this.baseUrl, headers);

        return response.data;

    }


    async getBreweryById(breweryId: string): Promise<Brewery> {
        const response = await axios.get<Brewery>(`${this.baseUrl}/${breweryId}`, this.createHeaders());
        return response.data;
    }

    async getReviewByBreweryId(breweryId: string): Promise<CustomerReview[]> {

        const headers = this.createHeaders();
        headers.params = { breweryId: breweryId ? { breweryId } : {} }

        const response = await axios.get<CustomerReview[]>(`${this.baseUrl}/reviews`, headers);
        return response.data;
    }


    async addBrewery(brewery: Brewery): Promise<Brewery> {

        const response = await axios.post<Brewery>(this.baseUrl, brewery, this.createHeaders())
        return response.data

    }

    async updateBrewery(brewery: Brewery): Promise<void> {

        const url = `${this.baseUrl}/${brewery.breweryId}`
        await axios.put<void>(url, brewery, this.createHeaders())
    }

    async deleteBrewery(id: string) {

        const url = `${this.baseUrl}/${this.baseUrl}/${id}`
        await axios.delete<void>(url, this.createHeaders())
    }


}

const breweryService = new BreweryService()
export default breweryService