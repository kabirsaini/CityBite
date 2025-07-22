import '@/Components/User/Style/Results.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Results = () => {
    const { city } = useParams();
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurantsByCity = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/restaurants/city/${city}`);
                const data = await res.json();

                if (res.ok) {
                    setRestaurants(data.restaurants || []);
                } else {
                    alert(data.message || "Error fetching restaurants.");
                }
            } catch (err) {
                console.error(err);
                alert("Failed to fetch restaurants");
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantsByCity();
    }, [city]);

    const handleRestaurantClick = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/restaurants/click/${id}`, {
                method: 'PUT',
            });
    
            console.log("Restaurant clicked:", id);
    
            if (!res.ok) {
                const data = await res.json();
                console.warn("Click not tracked:", data.message || "Unknown error");
            }
    
            navigate(`/restaurant/${id}`);
        } catch (err) {
            console.error("Failed to track click:", err);
            navigate(`/restaurant/${id}`); // Still allow navigation
        }
    };
    


    return (
        <>
        <div className="results-page">
            <h2>Best Restaurants in "{city}"</h2>

            {loading ? (
                <p>Loading...</p>
            ) : restaurants.length === 0 ? (
                <p>No restaurants found.</p>
            ) : (
                <div className="restaurant-cont">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant._id}
                            className="restaurant-card"
                            onClick={() => handleRestaurantClick(restaurant._id)}

                            style={{ cursor: 'pointer' }}
                        >
                            <div className="restaurant-image">
                                <img src={`http://localhost:3000/${restaurant.image}`} alt={restaurant.name} />
                            </div>
                            <h2 className="restaurant-name">{restaurant.name}</h2>
                            <p className="restaurant-description">{restaurant.description}</p>
                            <p className="restaurant-city">
                                <strong>City:</strong> {restaurant.address?.city}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
};

export default Results;
