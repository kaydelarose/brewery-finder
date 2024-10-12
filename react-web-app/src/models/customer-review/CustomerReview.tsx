export class CustomerReview
{
    reviewId!: number;
    customerId!: number;
    breweryId!: string;
    rating!: number;
    customerReview?: string;
    reviewDate!: Date;
}