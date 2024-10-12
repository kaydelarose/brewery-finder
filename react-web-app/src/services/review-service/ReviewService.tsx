import axios from "axios";
import { CustomerReview } from "../../models/customer-review/CustomerReview";


class ReviewService {

    baseUrl = `${import.meta.env.VITE_API_BASE_URL}/reviews`;


    async getAllReviews(custId?: number, brewId?: string): Promise<CustomerReview[]> {

        const response = await axios.get<CustomerReview[]>(this.baseUrl, {
            params: { custId, brewId }
        });
        return response.data;
    }

    async getReviewByCustomerId(customerId: number): Promise<CustomerReview[]> {

        const response = await axios.get<CustomerReview[]>(`${this.baseUrl}/${customerId}`);
        return response.data;
    }

    async addReview(review: CustomerReview): Promise<CustomerReview> {
        
        const response = await axios.post<CustomerReview>(this.baseUrl, review);
        return response.data;
    }

    async updateReview(reviewId: number, review: CustomerReview): Promise<void> {

        await axios.put(`${this.baseUrl}/${reviewId}`, review);
    }

    async deleteReview(reviewId: number): Promise<void> {

        await axios.delete(`${this.baseUrl}/${reviewId}`);
    }

}

const reviewService = new ReviewService();
export default reviewService;