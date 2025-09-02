import '@/Components/User/Style/Profile.css';
import { useEffect, useState } from "react";

const MyOrders = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:3000/api/users/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch profile");

                const data = await res.json();
                setUser(data.user);
                setOrders(data.orders || []);
                console.log(data.orders);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <div className="profile-orders card">
                <h3>Your Orders</h3>
                {orders.length > 0 ? (
                    <ul className="orders-list">
                        {orders.map((order, idx) => (
                            <li key={order._id} className="order-card">
                                <div className="order-header">
                                    <h4>Order #{idx + 1}</h4>
                                    <span className={`status ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                                <ul className="order-products">
                                    {order.products.map((item, i) => (
                                        
                                        <li key={i}>
                                            {item.productId?.name} Qty: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    )
}

export default MyOrders
