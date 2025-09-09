import '@/Components/Vendor/Style/Delete.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteRestaurant = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch vendor's own restaurant
        const fetchMyRestaurant = async () => {
            try {
                const res = await fetch("https://food-website-backend-20z8.onrender.com/api/restaurants/my", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setRestaurant(data.restaurant);
                } else {
                    alert(data.message || "Failed to fetch restaurant");
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                alert("Error fetching restaurant");
                setLoading(false);
            }
        };

        fetchMyRestaurant();
    }, [token]);

    const handleDelete = async () => {
        if (!restaurant) return;

        const confirm = window.confirm("Are you sure you want to delete this restaurant?");
        if (!confirm) return;

        try {
            const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/restaurants/${restaurant._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (res.ok) {
                alert("Restaurant deleted successfully ✅");
                navigate("/login"); // Redirect to vendor dashboard
            } else {
                alert(data.message || "Failed to delete restaurant");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting restaurant");
        }
    };

    if (loading) return <p>Loading your restaurant...</p>;
    if (!restaurant) return <p>No restaurant found for deletion.</p>;

    return (
        <>
            <div className="delete-container">
                <h2>Delete Restaurant</h2>
                <p><strong>Name:</strong> {restaurant.name}</p>
                <p><strong>Address:</strong> {restaurant.address?.street}, {restaurant.address?.city}, {restaurant.address?.state} - {restaurant.address?.pincode}</p>
                <p><strong>Phone:</strong> {restaurant.phone}</p>
                <button className="delete-btn" onClick={handleDelete}>
                    Delete Restaurant Permanently
                </button>
            </div>
        </>
    );
};

export default DeleteRestaurant;
