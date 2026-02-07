import React from "react";
import "../pages/TripItinerary.css"; // or separate ImageCard CSS if you want
import usePlaceImage from '../Hooks/usePlaceImage'




const ImageCard = ({ message }) => {
  const {placeName,description,type,costLKR}=message;
  const { imageUrl, loading } = usePlaceImage(placeName);
  return (
    <div className="activity-card">
      <div className="card-content">
        <div className="activity-image">
          {loading ? (
          <p>Loading...</p>
        ) : (
          <img
            src={imageUrl || "https://via.placeholder.com/400"}
            alt={placeName}
          />
        )}
        </div>

        <div className="activity-details">
          <div className="activity-header">
            <h3 className="activity-title">{placeName}</h3>
            {message.category && (
              <span className="activity-category">{type}</span>
            )}
          </div>
          <p className="activity-description">{description}</p>
          <p className="activity-note">{costLKR}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
