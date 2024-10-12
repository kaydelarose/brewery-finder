import axios from "axios";
import { Brewer } from "../../models/brewer/Brewer";
import BaseService from "../base-service";

class BrewerService extends BaseService
{
    baseUrl = `${import.meta.env.VITE_API_BASE_URL}/brewers`

    async getBrewers(): Promise<Brewer[]>
    {
        const response = await axios.get<Brewer[]>(this.baseUrl, this.createHeaders())
        return response.data
    }

    async getBrewerById(id:Number): Promise<Brewer>
    {
        const response = await axios.get(`${this.baseUrl}/${id}`, this.createHeaders())
        return response.data
    }

    async addBrewer(brewer: Brewer):Promise<Brewer>
    {
        const respose = await axios.post<Brewer>(this.baseUrl, brewer, this.createHeaders())
        return respose.data
    }

    async updateBrewer(brewer: Brewer): Promise<void>
    {
        const url = `${this.baseUrl}/${brewer.brewerId}`
        await axios.put<void>(url, brewer, this.createHeaders())
    }

    async deleteBrewer(id:number)
    {
        const url = `${this.baseUrl}/${id}`
        await axios.delete<void>(url, this.createHeaders())
    }


}

const brewerService = new BrewerService();
export default brewerService;