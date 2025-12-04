import '@/Components/User/Style/Restaurant.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Restaurant = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('about');
    const [restaurant, setRestaurant] = useState({});
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [cart, setCart] = useState({
        products: [],
        totalPrice: 0
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRestaurantAndProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/restaurants/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setRestaurant(data.restaurant);
                    setReviews(data.reviews || []);

                    // Only fetchinf product when restaurant data is avaialble
                    const productRes = await fetch(`https://food-website-backend-20z8.onrender.com/api/products/restaurant/${data.restaurant._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });

                    const productData = await productRes.json();

                    if (productRes.ok) {
                        setProducts(productData.products);
                    } else {
                        console.error(productData);
                    }

                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error(error);
                alert("Failed to fetch restaurant or products.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchRestaurantAndProducts();
    }, [id]);


    const handleAddToCart = async (item) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://food-website-backend-20z8.onrender.com/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: item._id,
                    quantity: 1,
                    city: restaurant.address?.city
                })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Item added to cart successfully!");
                fetchCart();
            } else {
                console.error(data.message || "Failed to add to cart");
                alert("Failed to add item to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Something went wrong.");
        }
    };

    const fetchCart = async () => {
        const res = await fetch("https://food-website-backend-20z8.onrender.com/api/cart", {
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


    return (
        <>
                {loading ? (
                    <p style={{textAlign: "center", marginTop:"30px",fontFamily: `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
                    
                        /* font-size: 18px; */
                        color: "#666"}}>Loading...</p>
                ) : (
            <div className="restaurant-details">
                <div className="tab-nav">
                    <button
                        className={activeTab === 'about' ? 'active' : ''}
                        onClick={() => setActiveTab('about')}
                    >
                        About Us
                    </button>
                    <button
                        className={activeTab === 'menu' ? 'active' : ''}
                        onClick={() => setActiveTab('menu')}
                    >
                        Menu
                    </button>
                    <button
                        className={activeTab === 'contact' ? 'active' : ''}
                        onClick={() => setActiveTab('contact')}
                    >
                        Contact Us
                    </button>
                </div>
                

                <div className="tab-content">
                    {activeTab === 'about' && (
                        <>
                            <div className="restaurant-image">
                                <img src={restaurant.image} alt={restaurant.name} />
                            </div>
                            <div>
                                <h3>About Us</h3>
                                <p>{restaurant.description || "Description not available."}</p>
                            </div>
                        </>
                    )}

                    {activeTab === 'menu' && (
                        <div>
                            <h3>Menu</h3>
                            {products.length > 0 ? (
                                <ul>
                                    <div className="menu-list">
                                        {products.map((item, index) => (
                                            <div className={`menu-item ${!item.isAvailable ? 'unavailable' : ''}`} key={index}>

                                                <img id='menu-item-img'
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                                <div style={{ margin: "4px 0px 0px 14px" }}>
                                                    {item.tags === "veg" ? (<img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764870102/Veg_symbol.svg_gertl5.png" alt="" height={23} width={23} />)
                                                        : (<img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764872800/Non_veg_symbol.svg_dntdkk.png" alt="" height={23} width={23} />)}
                                                </div>


                                                <div className='details-cont' style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px" }}>
                                                    <div>
                                                    <p>{item.name}</p>
                                                    <p>{item.category}</p>
                                                    <p>Price: ₹{item.price}</p>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", justifyContent: "center" }}>
                                                        <button
                                                            className="add-to-cart"
                                                            onClick={() => handleAddToCart(item)}
                                                            disabled={!item.isAvailable}
                                                        >
                                                            {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
                                                        </button>
                                                    </div>
                                                </div>


                                                {!item.isAvailable && <div className="overlay"></div>}
                                            </div>
                                        ))}
                                    </div>
                                </ul>
                            ) : (
                                <p>No items found in the menu.</p>
                            )}
                        </div>
                    )}


                    {activeTab === 'contact' && (
                        <div>
                            <h3>Contact Us</h3>
                            <p>Email: {restaurant.owner?.email || 'Not available'}</p>
                            <p>Phone: {restaurant.phone || 'Not available'}</p>
                        </div>
                    )}
                </div>
            </div>
            )}
        </>
    );
};

export default Restaurant;
