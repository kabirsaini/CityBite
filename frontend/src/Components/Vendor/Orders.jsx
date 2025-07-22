import { useEffect, useState } from 'react';

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendorOrders = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/orders/vendor/orders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                });

                const data = await res.json();
                setOrders(data.orders || []);
            } catch (err) {
                console.error("Failed to fetch vendor orders", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVendorOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;

    return (
        <div style={{ padding: '2rem', margin: '300px' }}>
            <h2>Customer Orders for Your Restaurant</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order, idx) => (
                    <div key={order._id} style={{ border: '1px solid #ddd', marginBottom: '20px', padding: '15px' }}>
                        <h4>Order #{idx + 1}</h4>
                        <p><strong>Customer:</strong> {order.userId?.name} ({order.userId?.email})</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Total:</strong> ₹{order.totalPrice}</p>

                        <ul>
                            {order.products.map((item, i) => (
                                <li key={i}>
                                    {item.productId?.name} — Qty: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default VendorOrders;
