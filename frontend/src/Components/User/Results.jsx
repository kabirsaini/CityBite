import '@/Components/User/Style/Results.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


const Results = ({ city2 }) => {
    const { city, cat } = useParams();

    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [city1, setCity] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchRestaurantsByCity = async () => {
            try {
                const cityToFetch = city2 || city;
                if (!cityToFetch) return;

                const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/restaurants/city/${cityToFetch}`);
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
    }, [city, city2]);

    useEffect(() => {
        const fetchByCategory = async (cat) => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/products/category/${cat}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (!res.ok) {
                    alert(data.message || "Error fetching food by category.");
                }
                setCategory(data.products || []);
            }
            catch (err) {
                console.error(err);
                alert("Failed to fetch food by category");
            }
        };

        fetchByCategory(cat);
    }, [cat]);


    const handleRestaurantClick = async (id) => {
        try {
            const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/restaurants/click/${id}`, {
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




    const handleSearch = () => {
        if (city1.trim() !== '') {
            navigate(`/results/${city1}`);
        }
    }




    return (
        <>
            <div className="results-page">

                <div className="finder2">

                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for a Restaurant"
                        className="find-input2"
                        value={city1}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevents page refresh
                                handleSearch();
                            }
                        }}
                    />


                </div>

                <h2 className='top-head'>Best Restaurants in {city || cat}</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : category.length > 0 ? (
                    // ---------- SHOW CATEGORIES ----------
                    <div className="restaurant-cont2">
                        {category.map((cat) => (
                            <div
                                key={cat._id}
                                className="restaurant-card1"
                                onClick={() => handleRestaurantClick(cat._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="restaurant-image">
                                    <img src={cat.image} alt={cat.name} />
                                </div>
                                <div className='details'>
                                    <h2 className="restaurant1-name">{cat.name}</h2>
                                    <p className="restaurant1-category">
                                        {cat.category}
                                    </p>

                                    <p className="restaurant1-city">
                                        {cat.restaurantId?.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : restaurants.length === 0 ? (
                    <p>No restaurants found.</p>
                ) : (
                    // ---------- SHOW RESTAURANTS ----------
                    <div className="restaurant-cont2">
                        {restaurants.map((restaurant) => (
                            <div
                                key={restaurant._id}
                                className="restaurant-card1"
                                onClick={() => handleRestaurantClick(restaurant._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="restaurant-image">
                                    <img src={restaurant.image} alt={restaurant.name} />
                                </div>
                                <div className='details'>
                                    <h2 className="restaurant1-name">{restaurant.name}</h2>
                                    <p className="restaurant1-category">
                                        {restaurant.categories.join(", ")}
                                    </p>
                                    <p className="restaurant1-city">
                                        <strong>City:</strong> {restaurant.address?.city}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    );
};

export default Results;
