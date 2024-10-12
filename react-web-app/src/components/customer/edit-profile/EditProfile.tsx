import { useState } from 'react';
import './EditProfile.css';

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

interface EditProfileProps {
    initialProfileData: ProfileData;
    onSave: (updatedData: ProfileData) => void; 
    onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ initialProfileData, onSave, onCancel }) => {
    const [username, setUsername] = useState(initialProfileData.username);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const updatedProfileData: ProfileData = {
            ...initialProfileData,
            username
        };

        onSave(updatedProfileData);
    };

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="profile-btn-container">
                <button type="submit" className="save-form">Save</button>
                <button type="button" className="cancel-form" onClick={onCancel}>Cancel</button>
            </div>
        </form>
        </div>
    );
};

export default EditProfile;

