import axios from "axios";
import { Customer } from "../../models/customer/Customer";
import BaseService from "../base-service";

class CustomerService extends BaseService
{
    baseUrl = `${import.meta.env.VITE_API_BASE_URL}/customers`

    async getCustomers(): Promise<Customer[]>
    {
        const response = await axios.get<Customer[]>(this.baseUrl, this.createHeaders())
        return response.data
    }

    async addCustomer(customer: Customer): Promise<Customer>
    {
        const response = await axios.post<Customer>(this.baseUrl, customer)
        return response.data
    }

    async updateCustomer(customer: Customer): Promise<void>
    {
        const url = `${this.baseUrl}/${customer.customerId}`
        await axios.put<void>(url, customer)
    }

    async deleteCustomer(id: number)
    {
        const url = `${this.baseUrl}/${id}`
        await axios.delete<void>(url)
    }

    async getCustomerReviews(): Promise<any>
    {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/customers/reviews`, this.createHeaders())
        return response.data
    }

    async getCustomerReviewsByCustomerId(customerId: number): Promise<any>
    {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/customers/reviews/${customerId}`, this.createHeaders())
        return response.data
    }
}

const customerService = new CustomerService()
export default customerService