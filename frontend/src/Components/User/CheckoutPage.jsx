import '@/Components/User/Style/Checkout.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MiniPopup from './MiniPopup';
import '@/Components/User/Style/MiniPopup.css';

const CheckoutPage = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];
    const total = location.state?.total || 0;

    const [savedAddress, setSavedAddress] = useState(null);
    const [formAddress, setFormAddress] = useState({
        street: '',
        city: '',
        state: '',
        pincode: ''
    });


    const [showForm, setShowForm] = useState(false);

    const [method, setMethod] = useState("");

    const [coupon, setCoupon] = useState("");
    const [finalTotal, setFinalTotal] = useState(total);
    const [message, setMessage] = useState("");


    const applyCoupon = () => {
        if (coupon.trim().toUpperCase() === "CITYBITE10") {
            const discounted = total - total * 0.10; // 10% OFF
            setFinalTotal(discounted);
            setMessage("Coupon Applied! 10% discount added.");
        } else {
            setFinalTotal(total);
            setMessage("❌ Invalid coupon code.");
        }
    };

    const handleProceed = () => {
        if (!method) {
            alert("Please select a payment method.");
            return;
        }

        if (method === "cod") {
            alert("Order placed with Cash on Delivery ✅");
        } else if (method === "online") {
            handlePayment(); // Razorpay
        }
    };

    //User's saved address
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/users/getAddress', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await res.json();
                if (res.ok && data.address && data.address.street) {
                    setSavedAddress(data.address);
                    setFinalTotal(finalTotal + 50);
                } else {
                    setShowForm(true); // no address found
                }
            } catch (err) {
                console.error('Failed to fetch address:', err);
                setShowForm(true); // fallback: show form
            }
        };

        fetchAddress();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormAddress(prev => ({ ...prev, [name]: value }));
    };

    // Save/update address
    const handleUpdate = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users/saveAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formAddress),
            });

            const data = await res.json();

            if (res.ok) {
                setSavedAddress(data.address);
                setShowForm(false);
            } else {
                alert(data.message || 'Failed to save address');
            }
        } catch (err) {
            console.error('Error saving address:', err);
            alert('Error saving address');
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'; // hosted JS file provided by Razorpay to open the payment modal.
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load');
            return;
        }

        const response = await fetch('https://food-website-backend-20z8.onrender.com/api/payments/createOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: finalTotal }),
        });

        const data = await response.json();

        const options = {
            key: 'rzp_test_M9UX3DjW2bBcA3',
            amount: data.amount,
            currency: 'INR',
            name: 'CityBite',
            description: 'Test Transaction',
            image: '/logo.png',
            order_id: data.id,
            handler: async function (response) {
                toast.success("Payment successfull! ✅");
                try {
                    const orderRes = await fetch('https://food-website-backend-20z8.onrender.com/api/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    const result = await orderRes.json();

                    if (orderRes.ok) {
                        toast.success("Order placed successfully! ✅");
                        navigate('/MainPage');
                        props.clearCart();
                    } else {
                        alert(result.message || 'Failed to place order.');
                    }
                } catch (err) {
                    console.error("Error creating order:", err);
                    alert("Order creation failed.");
                }
            },
            prefill: {
                name: '', // optional
                email: '', // Optional
                contact: '', // Optional
            },
            notes: {
                address: `${savedAddress?.street}, ${savedAddress?.city}, ${savedAddress?.state}, ${savedAddress?.pincode}`
            },
            theme: {
                color: '#007bff',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const fetchCart = async()=>{
        const res=await fetch("https://food-website-backend-20z8.onrender.com/api/cart", {
            method:'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data=await res.json();
        setCart(data);
    };

    useEffect( ()=>{
        fetchCart();
    },[]);

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
            } else {
                console.error(data.message || "Failed to add to cart");
                alert("Failed to add item to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <>
            <div className="checkout-container">

                <div className="checkout-left">

                    <div className="Checkout">
                        <h3>Delivery Address</h3>

                        {savedAddress ? (
                            <>


                                <div className="saved-address">
                                    <p>{savedAddress.street}, {savedAddress.city}</p>
                                    <p>{savedAddress.state} - {savedAddress.pincode}</p>
                                </div>
                                <div className="divider">
                                    <span>or</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <button
                                        style={{
                                            backgroundColor: "white",
                                            padding: "10px",
                                            border: "0.7px solid black",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            color: "#da2031"
                                        }}
                                        onClick={() => setShowForm(true)}
                                    >
                                        + Change Address
                                    </button>

                                </div>
                            </>
                        ) : (
                            <p>Loading address...</p>
                        )}

                        {showForm && (
                            <MiniPopup onClose={() => setShowForm(false)}>
                                <div class="address-form">
                                    <h4>{savedAddress ? 'Update Address' : 'Add Address'}</h4>
                                    <input type="text" name="street" placeholder="Street" value={formAddress.street} onChange={handleChange} />
                                    <input type="text" name="city" placeholder="City" value={formAddress.city} onChange={handleChange} />
                                    <input type="text" name="state" placeholder="State" value={formAddress.state} onChange={handleChange} />
                                    <input type="text" name="pincode" placeholder="Pincode" value={formAddress.pincode} onChange={handleChange} />
                                    <button onClick={handleUpdate}>Save</button>
                                </div>
                            </MiniPopup>
                        )}


                        {/* Payment Section */}
                        <div className="payment">

                            <h3>Select Payment Method</h3>

                            <div className="payment1">
                                <p>Online Payments</p>

                                <label className="payment-method">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="online"
                                        checked={method === "online"}
                                        onChange={() => setMethod("online")}
                                    />
                                    <img src="Razorpay_logo.svg" width={80} height={30} alt="Razorpay" />
                                </label>

                                <p>Pay on Delivery</p>
                                <label className="payment-method">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={method === "cod"}
                                        onChange={() => setMethod("cod")}
                                    />
                                    <img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764085460/curved-stack-money-icon-3d-illustration_56104-2816_cez2mo.webp" alt="" height={40} width={40} />
                                    Cash on Delivery
                                </label>


                            </div>

                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE - Order Summary */}
                <div className="checkout-right">
                    <h2 style={{ fontFamily: `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif` }}>Order Summary</h2>
                    <div className="order-summary">
                        <ul className="cart-list">
                            {cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <span>{item.name}</span>
                                    <span>{item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="coupon-code">
                            <div className="coupon-input" style={{ display: "flex", justifyContent: "space-between", border: "0.5px solid #000075", borderRadius: "10px", padding: "5px" }}>
                                <input type="text" placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} style={{ border: "0px", width: "80%", outline: "none" }} />
                                <p onClick={applyCoupon} style={{ cursor: "pointer" }}>Apply</p>

                            </div>
                            {message && (<p style={{ color: "#da2031", marginTop: "5px", fontSize: "14px" }}> {message} </p>
                            )}

                        </div>

                        <div className="total-summary" style={{ marginTop: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "rgb(125 125 125)" }}>
                                <p>Sub-total:</p>
                                <p>₹{total}</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "rgb(125 125 125)" }}>
                                <p>Delivery Charges:</p>
                                <p>₹ 50</p>
                            </div>
                            {message &&
                                (
                                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgb(125 125 125)" }}>
                                        <p>Coupon Code:</p>
                                        <p>- ₹{total * 0.10}</p>
                                    </div>
                                )}

                            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid #00000075" }}>
                                <p className="order-total" ><strong> Total</strong></p>
                                <p style={{ fontSize: "18px", fontFamily: `"Inter", sans-serif`, fontWeight: "600", color: "#000000cc" }}> ₹{finalTotal.toFixed(2)}</p>
                            </div>

                        </div>
                    </div>
                    <button
                        onClick={() => {
                            handleProceed();
                            handleAddToCart(cartItems);
                        }}
                        className="proceed-btn"
                    >
                        Proceed
                    </button>
                </div>
            </div>

        </>
    );
};

export default CheckoutPage;
