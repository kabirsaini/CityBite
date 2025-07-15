import React, { useState } from 'react';
import MiniPopup from './MiniPopup';

const AddressSection = () => {
    const [showForm, setShowForm] = useState(false);

    const [savedAddress, setSavedAddress] = useState({
        name: 'Kabir Saini',
        houseNumber: '123A',
        street: 'MG Road',
        city: 'Jalandhar',
        pincode: '144001',
    });

    const [formAddress, setFormAddress] = useState(savedAddress);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        setSavedAddress(formAddress);
        setShowForm(false);
    };

    return (
        <>
        <div style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ddd' }}>
            <h3>Delivery Address</h3>
            <p><strong>{savedAddress.name}</strong></p>
            <p>{savedAddress.houseNumber}, {savedAddress.street}</p>
            <p>{savedAddress.city} - {savedAddress.pincode}</p>

            <p
                style={{ color: 'blue', cursor: 'pointer', marginTop: '10px' }}
                onClick={() => setShowForm(true)}
            >
                Change Address
            </p>

            {showForm && (
                <MiniPopup onClose={() => setShowForm(false)}>
                    <h4>Update Address</h4>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formAddress.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="houseNumber"
                        placeholder="House Number"
                        value={formAddress.houseNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="street"
                        placeholder="Street Name"
                        value={formAddress.street}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formAddress.city}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formAddress.pincode}
                        onChange={handleChange}
                    />
                    <button
                        onClick={handleUpdate}
                        style={{
                            padding: '8px 12px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Update
                    </button>
                </MiniPopup>
            )}

            <div className="payment">
                <h2>Select Payment Method</h2>
                <div className="payment-methods">
                    <div className="payment-method">
                        </div>
                        </div>
            </div>


        </div>
        </>
    );
};

export default AddressSection;
