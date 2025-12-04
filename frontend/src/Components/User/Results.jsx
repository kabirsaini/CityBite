import '@/Components/User/Style/Results.css';
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';


const Results = ({ city2 }) => {
    const { city, cat } = useParams();

    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [city1, setCity] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (cat) return;

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
                    setLoading(false);
                    console.log(data.message || "Error fetching food by category.");
                }
                setCategory(data.products || []);
            }
            catch (err) {
                setLoading(false);
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };

        if (cat) fetchByCategory(cat);
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
                        placeholder="Search for a Restaurant, food or cuisine"
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

                {loading ? (
                    <p>Loading...</p>
                ) : category.length > 0 ? (
                    // ---------- SHOW CATEGORIES ----------
                    <>
                        <div className="head" style={{ marginLeft: "50px", marginBottom: "20px", }}>
                            <h1>{cat}</h1>
                            <p style={{ display: "flex", marginTop: "10px", color: "#666" }}>Indulge with the best of {cat} cuisines.</p>

                        </div>
                        <div className="restaurant-cont2">
                            {category.map((cat) => (
                                <div
                                    key={cat._id}
                                    className="restaurant-card1"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="restaurant-image">
                                        <img src={cat.image} alt={cat.name} />
                                    </div>
                                    <div style={{ margin: "4px 0px 0px 14px" }}>
                                        {cat.tags === "veg" ? (<img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764870102/Veg_symbol.svg_gertl5.png" alt="" height={23} width={23} />)
                                            : (<img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764872800/Non_veg_symbol.svg_dntdkk.png" alt="" height={23} width={23} />)}
                                    </div>

                                    
                                    <div className='details-cont' style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px" }}>
                                        <div className='details'>
                                            <h3 className="restaurant1-name">{cat.name}</h3>
                                            <p className="restaurant1-city">
                                                ₹{cat.price}
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", justifyContent: "center", marginRight: "20px" }}>
                                            <button className='add-to-cart'>Add to cart</button>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", margin: "5px 14px 0px 14px", borderTop: "1px solid lightsteelblue", paddingTop: "8px" }}
                                        onClick={() => handleRestaurantClick(cat.restaurantId?._id)}
                                    >
                                        <p>More From {cat.restaurantId?.name}</p>
                                        <ArrowRight size={18} style={{ verticalAlign: "middle", color: "#666" }} strokeWidth={2} />
                                    </div>
                                </div>

                            ))}
                        </div>
                    </>
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
                                style={{ cursor: 'pointer'}}
                            >
                                <div className="restaurant-image">
                                    <img src={restaurant.image} alt={restaurant.name} />
                                </div>
                                <div className='details' style={{ margin:"5px 0px 0px 10px"}}>
                                    <h3 className="restaurant1-name">{restaurant.name}</h3>
                                    <div style={{display:"flex", gap:"3px"}}>

                                    <img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764878816/ChatGPT_Image_Dec_5_2025_01_33_06_AM_h3zics.png" alt="" height={20} width={20} />
                                    <p>{restaurant.ratings.average}</p>
                                    </div>
                                    <p className="restaurant1-category">
                                        {restaurant.categories.join(", ")}
                                    </p>
                                    <p className="restaurant1-city">
                                        {restaurant.address?.street}
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
