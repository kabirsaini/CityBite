import '@/Components/User/Style/Cart.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({city}) => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [cart, setCart] = useState({
        products: [],
        totalPrice: 0
    });
    const [restaurants, setRestaurant] = useState([]);

    const total = cart.products.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );




    const handleBuyNow = () => {
        navigate('/Checkout', {
            state: {
                cart: cart.products,
                total: cart.totalPrice
            }
        });
    };



    // useEffect(() => {
    //     const fetchcityRestaurants = async () => {
    //         try {
    //             const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/restaurants/city/${city}`);
    //             const data = await res.json();

    //             if (res.ok) {
    //                 setRestaurant(data.restaurants || []);
    //             }
    //             else {
    //                 alert(data.message || "Error fetching restaurants.");
    //                 throw new Error("Failed to fetch restaurants");
    //             }
    //         }
    //         catch (err) {
    //             console.error(err);
    //         }
    //     }

    //     fetchcityRestaurants();
    // }, [city]);

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

    const fetchCart = async () => {
        const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/cart`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        setCart(data);
    };

    useEffect(() => {
        fetchCart();
    }, []);


    const increaseQuantity = async (id) => {
        await fetch(`https://food-website-backend-20z8.onrender.com/api/cart/increase/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fetchCart();
    }


    const decreaseQuantity = async (id) => {
        await fetch(`https://food-website-backend-20z8.onrender.com/api/cart/decrease/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fetchCart();
    }

    const removeItem = async (id) => {
        await fetch(`https://food-website-backend-20z8.onrender.com/api/cart/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchCart();
    };





    return (
        <>
            <div className="cart-container">
                <h2>Your Cart</h2>

                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="cart-list">
                            {cart.products.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.name}
                                    />
                                    <span>{item.productId.name}</span>

                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', width: "60px", justifyContent: "space-between",paddingLeft: "10px",
    paddingRight: "10px" }}>
                                        <button onClick={() => increaseQuantity(item.productId._id)} style={{
                                            borderRadius: '5px',
                                            backgroundColor: "white",
                                            border: "white",
                                        }}>+</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => decreaseQuantity(item.productId._id)} style={{
                                            borderRadius: '5px',
                                            backgroundColor: "white",
                                            border: "white",
                                        }}>-</button>
                                    </div>
                                    <span>₹{item.productId.price * item.quantity} </span>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.productId._id)}
                                    >
                                        X
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
