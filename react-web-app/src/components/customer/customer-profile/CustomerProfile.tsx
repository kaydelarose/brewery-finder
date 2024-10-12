import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CustomersContext } from '../../../contexts/customer-context/CustomersContext'
import customerService from "../../../services/customer-service/CustomerService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import EditProfile from "../edit-profile/EditProfile";
import './CustomerProfile.css';
import { FaMapMarkerAlt, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import userProfile from '../../../assets/images/user-profile.png';

interface Review {
    reviewId: number;
    rating: number;
    customerReview: string;
    breweryName: string;
    city: string;
    reviewDate: string;
    stateProvince: string;
}

interface ProfileData {
    userId: number;
    username: string;
    userRole: string;
    favoriteBreweries: string;
    reviews: Review[];
}

export default function CustomerProfile() {
    const { customerId } = useParams();
    const context = useContext(CustomersContext);
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication);
    const userId = user?.id;

    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    if (!context) {
        throw new Error('CustomerProfile must be used within a CustomersContextProvider');
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const reviews = await customerService.getCustomerReviews()
                setProfileData(reviews);
                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching profile data", error);
                setError("Error fetching profile data");
                setLoading(false);
            }
        };

        fetchProfile();
    }, [customerId]);

    const handleSaveProfile = (updatedData: ProfileData) => {
        setProfileData(updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-image-container">
                        <p className="customer-username"> {profileData?.username} </p>
                        <img src={userProfile} alt="Profile" className="profile-image" />
                    </div>

                    <div className="profile-details">
                        <p><strong>ID: </strong> {userId} </p>
                        <p><strong>Role: </strong> {profileData?.userRole} </p>
                        <p><strong>Favorites: </strong> {profileData?.favoriteBreweries} </p>
                        <button className="customer-edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                </div>

                {isEditing && profileData ? (
                    <EditProfile
                        initialProfileData={profileData}
                        onSave={handleSaveProfile}
                        onCancel={handleCancel}
                    />
                ) : (

                    <div className="reviews-container">
                        <h3> Reviews: </h3>
                        {profileData?.reviews.length === 0 ? (
                            <p> No reviews available </p>
                        ) : (
                            <ul>
                                {profileData?.reviews.map((review) => (
                                    <li key={review.reviewId} className="review-item">
                                        <div className="review-container">
                                            <div className="review-header">
                                                <p className="name"><strong> {review.breweryName} </strong>  </p>
                                                <p className="date"> {formatDate(review.reviewDate)} </p>
                                            </div>
                                            <p className="location"> <FaMapMarkerAlt /> {review.city}, {review.stateProvince} </p>
                                            <p className="indented-text"> <StarRating rating={review.rating} /> </p>
                                            <p className="indented-text"> {review.customerReview} </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}