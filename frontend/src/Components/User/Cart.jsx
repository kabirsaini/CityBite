import '@/Components/User/Style/Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart }) => {
    const navigate = useNavigate();
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleBuyNow = () => {
        navigate('/Checkout', {
            state: {
                cartItems,
                total
            }
        });
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cartItems.map((item, index) => (
                            <li key={index} className="cart-item">
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
    );
};

export default Cart;
