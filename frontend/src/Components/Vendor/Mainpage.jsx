import '@/Components/Vendor/Style/Mainfile.css';
import { useEffect, useState } from 'react';
import {
    Bar, BarChart, CartesianGrid, ResponsiveContainer,
    Tooltip, XAxis, YAxis
} from 'recharts';


const Mainpage = () => {
    const [vendor, setVendor] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [visitsData, setVisitsData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [ordersData, setOrdersData] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchVendor = async () => {
            try {
                const res = await fetch('https://food-website-backend-20z8.onrender.com/api/users/me', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = await res.json();
                if (res.ok) setVendor(data.user);
                else console.error(data.message);
            } catch (err) {
                console.error('Failed to fetch vendor:', err);
            }
        };

        const fetchRestaurant = async () => {
            try {
                const res = await fetch("https://food-website-backend-20z8.onrender.com/api/restaurants/my", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setRestaurant(data.restaurant);

                    if (data.restaurant.visitsByMonth) {
                        const transformedData = Object.entries(data.restaurant.visitsByMonth).map(([month, visits]) => ({
                            month,
                            visits
                        }));
                        setVisitsData(transformedData);
                    }
                } else {
                    console.error(data.message);
                }
            } catch (err) {
                console.error("Failed to fetch restaurant:", err);
            }
        };

        const fetchVendorOrders = async () => {
            try {
                const res = await fetch('https://food-website-backend-20z8.onrender.com/api/orders/vendor/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const data = await res.json();
                setOrders(data.orders || []);


                if (data.orders) {
                    const monthlyOrders = {};

                    data.orders.forEach(order => {
                        const date = new Date(order.createdAt);
                        const month = date.toLocaleString('default', { month: 'short', year: 'numeric' }); // e.g., "Jul 2025"
                        monthlyOrders[month] = (monthlyOrders[month] || 0) + 1;
                    });

                    const transformedOrderData = Object.entries(monthlyOrders).map(([month, count]) => ({
                        month,
                        orders: count,
                    }));

                    setOrdersData(transformedOrderData);
                }

            } catch (err) {
                console.error("Failed to fetch vendor orders", err);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchVendor();
        fetchRestaurant();
        fetchVendorOrders();
    }, []);


    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token"); // or however you store it

            const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,  // 👈 important
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setOrders(prev => prev.filter(order => order._id !== orderId));
            } else {
                console.error("Failed:", await res.json());
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };




    return (
        <div className="mainpage-container">
            {vendor ? (
                <div className="mainpage-heading">
                    <h1>Hello {vendor.name} 👋</h1>

                    {/* Orders Section - FIRST */}
                    {/* Orders Section */}
                    <div className="order-section">
                        <h2>Total Orders: {orders.length}</h2>

                        {loadingOrders ? (
                            <p>Loading orders...</p>
                        ) : orders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            orders.map((order, idx) => (
                                <div key={order._id} className="order-card">
                                    <h4>Order #{idx + 1}</h4>
                                    <p><strong>Customer:</strong> {order.userId?.name} ({order.userId?.email})</p>
                                    <p><strong>Status:</strong>Pending</p>
                                    <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                                    <ul>
                                        {order.products.map((item, i) => (
                                            <li key={i}>
                                                {item.productId?.name} — Qty: {item.quantity}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="actions">
                                        <button
                                            className="btn btn--completed"
                                            onClick={() => updateOrderStatus(order._id, "Completed")}
                                        >
                                            ✅ Completed
                                        </button>

                                        <button
                                            className="btn btn--declined"
                                            onClick={() => updateOrderStatus(order._id, "Cancelled")}
                                        >
                                            ❌ Declined
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Graph Section */}
                    <div className="vendor-info">
                        <h2>Your Restaurant Analysis</h2>

                        <div className="graph-container">
                            {visitsData.length > 0 && (
                                <div className="graph-card">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={visitsData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="visits" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <h3 className="graph-title">Visits Per Month</h3>
                                </div>
                            )}

                            {ordersData.length > 0 && (
                                <div className="graph-card">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={ordersData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis allowDecimals={false} />
                                            <Tooltip />
                                            <Bar dataKey="orders" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <h3 className="graph-title">Orders Per Month</h3>
                                </div>
                            )}
                        </div>
                    </div>


                </div>
            ) : (
                <p>Loading vendor info...</p>
            )}
        </div>
    );
};

export default Mainpage;
