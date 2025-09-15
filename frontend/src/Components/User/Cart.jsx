import '@/Components/User/Style/Cart.css';
import { useNavigate } from 'react-router-dom';
import Results from './Results';
import { useState, useEffect } from 'react';

const Cart = ({ cartItems, onRemoveFromCart }) => {
    const navigate = useNavigate();
    const [restaurants, setRestaurant] = useState([]);
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const city = cartItems.find(item => item.city)?.city.toUpperCase() || "";

    const handleBuyNow = () => {
        navigate('/Checkout', {
            state: {
                cartItems,
                total
            }
        });
    };

    useEffect(() => {
        const fetchcityRestaurants = async () => {
            try {
                const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/restaurants/city/${city}`);
                const data = await res.json();

                if (res.ok) {
                    setRestaurant(data.restaurants || []);
                }
                else {
                    alert(data.message || "Error fetching restaurants.");
                    throw new Error("Failed to fetch restaurants");
                }
            }
            catch (err) {
                console.error(err);
            }
        }

        fetchcityRestaurants();
    })

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

    return (
        <>
            <div className="cart-container">
                <h2>Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="cart-list">
                            {cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <span>{item.name}</span>
                                    <span>₹{item.price}</span>
                                    <button
                                        className="remove-btn"
                                        onClick={() => onRemoveFromCart(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-summary">
                            <h3>Total: ₹{total}</h3>
                            <button className="buy-now-btn" onClick={handleBuyNow}>
                                Buy Now
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="related-restaurants">
                <h2>Explore More in {city}</h2>


                {restaurants.length === 0 ? (
                    <p>No restaurants found.</p>
                ) : (
                    <div className="restaurant1-results">
                        <div className="restaurant-cont3">
                            {restaurants.map((restaurant) => (
                                <div
                                    key={restaurant._id}
                                    className="restaurant-card2"
                                    onClick={() => handleRestaurantClick(restaurant._id)}

                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="restaurant-image">
                                        <img src={restaurant.image} alt={restaurant.name} />
                                    </div>
                                    <h2 className="restaurant-name">{restaurant.name}</h2>
                                    <p className="restaurant-description">{restaurant.categories}</p>
                                    <p className="restaurant-city">
                                        <strong>City:</strong> {restaurant.address?.city}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
)}


            </div>
        </>
    );
};

export default Cart;
