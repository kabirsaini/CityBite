import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Style/Restaurant.css';

const Restaurant = ({ onAddToCart }) => {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState('about');

    return (
        <>
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
                        <div>
                            <h3>About Us</h3>
                            <p>This restaurant is known for its amazing ambience and delicious food.</p>
                        </div>
                    )}
                    {activeTab === 'menu' && (
                        <div>
                            <h3>Menu</h3>
                            <ul>
                                <div className="menu-item">
                                    <p>Pizza</p>
                                    <p>Price: ₹500</p>
                                    <button className="add-to-cart" onClick={()=> onAddToCart({ name: 'Pizza', price: 500 })}>Add to Cart</button>
                                </div>
                                <div className="menu-item">
                                    <p>burger</p>
                                    <p>Price: ₹500</p>
                                    <button className="add-to-cart" onClick={()=> onAddToCart({ name: 'burger', price: 500 })}>Add to Cart</button>
                                </div>
                            </ul>
                        </div>
                    )}
                    {activeTab === 'contact' && (
                        <div>
                            <h3>Contact Us</h3>
                            <p>Email: contact@restaurant.com</p>
                            <p>Phone: +91-1234567890</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Restaurant;
