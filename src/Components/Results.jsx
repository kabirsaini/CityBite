import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import data from './data/MOCK_DATA.json';
import './Style/Results.css';

const Results = () => {
    const { city } = useParams();
    const navigate = useNavigate();


    const filteredResults = data.filter((restaurant) =>
        restaurant.city.toLowerCase().includes(city.toLowerCase())
    );

    return (
        <div className="results-page">
            <h2>Best Restaurant in "{city}"</h2>

            {filteredResults.length === 0 ? (
                <p>No restaurants found.</p>
            ) : (
                <div className="restaurant-cont">
                    {filteredResults.map((restaurant) => (

                        <div
                            key={restaurant.id}
                            className="restaurant-card"
                            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="restaurant-image">
                                <img src={restaurant.image} alt={restaurant.name} />
                            </div>
                            <h2 className="restaurant-name">{restaurant.name}</h2>
                            <p className="restaurant-description">{restaurant.description}</p>
                            <p className="restaurant-city">
                                <strong>City:</strong> {restaurant.city}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Results;
