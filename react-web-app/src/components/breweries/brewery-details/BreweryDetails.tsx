import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BreweryContext } from '../../../contexts/brewery-context/BreweryContext';
import { CustomerReview } from "../../../models/customer-review/CustomerReview";
import reviewService from '../../../services/review-service/ReviewService';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import beerLine from '../../../assets/images/beer-line.jpg';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./BreweryDetails.css"

export default function BreweryDetails() {
    
    const { breweryId } = useParams(); 
    const context = useContext(BreweryContext);
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<CustomerReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    if (!context) {
        return <div>Error: Brewery context is not available</div>;
    }

    const { breweries } = context;
    const brewery = breweries.find(b => b.breweryId === breweryId);

    if (!brewery) {
        return <div>Brewery not found</div>;
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await reviewService.getAllReviews(undefined, breweryId!);
                setReviews(fetchedReviews);
            } catch (error) {
                setError("Error fetching reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [breweryId]);

    const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <span className="star-rating">

                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={index} style={{ color: 'gold' }} />
                ))}

                {halfStar && <FaStarHalfAlt style={{ color: 'gold' }} />}

                {[...Array(emptyStars)].map((_, index) => (
                    <FaRegStar key={index} style={{ color: 'gold' }} />
                ))}
            </span>
        );
    };

    return (
        <div className="brewery-page-container">
            <div className="brewery-details-container">
                <button className="back-button" onClick={() => navigate('/breweries')}>Back to Breweries</button>

                <h2>{brewery.breweryName}</h2>
                <p>Type: {brewery.breweryType}</p>
                <p>Address: {brewery.address}, {brewery.city}, {brewery.stateProvince}</p>
                <p>Phone: {brewery.phone}</p>
                <p>Website: <a href={brewery.websiteUrl}>{brewery.websiteUrl}</a></p>

                <h3>Reviews</h3>
                {loading && <p>Loading reviews...</p>}
                {error && <p>{error}</p>}
                {!loading && reviews.length === 0 && <p>No reviews available.</p>}

                {!loading && reviews.length > 0 && (
                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={false} dynamicHeight={true} showArrows={true}>
                    {reviews.map((review) => (
                        <div key={review.reviewId} className="review-card">
                            <p> <StarRating rating={review.rating} /> </p>
                            <p>{review.customerReview}</p>
                            <p><em>{new Date(review.reviewDate).toLocaleDateString()}</em></p>
                        </div>
                    ))}
                </Carousel>
                )}

                <div className="beer-line-container">
                    <img src={beerLine} alt="Beer Line" className="beer-line-image" />
                </div>

            </div>
        </div>
    );
}