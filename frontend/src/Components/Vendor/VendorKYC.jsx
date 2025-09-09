import '@/Components/Vendor/Style/VendorKYC.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VendorKYC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        categories: '',
        openingTime: '',
        closingTime: '',
        gsti: '',
        phone: '',
        latitude: '',
        longitude: ''
    });

    const [imageFile, setImageFile] = useState(null);         // ✅ Required!
    const [previewURL, setPreviewURL] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file); // ✅ Set the file
        if (file) {
            setPreviewURL(URL.createObjectURL(file)); // ✅ For preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!imageFile) {
            toast.error("Please upload an image");
            return;
        }
    
        const token = localStorage.getItem("token");
    
        const submitData = new FormData();
        submitData.append("name", formData.name);
        submitData.append("email", formData.email);
        submitData.append("description", formData.description);
        
        // Address as nested object
        submitData.append("address[street]", formData.street);
        submitData.append("address[city]", formData.city);
        submitData.append("address[state]", formData.state);
        submitData.append("address[pincode]", formData.pincode);
        
        // Opening hours as nested object
        submitData.append("openingHours[openingTime]", formData.openingTime);
        submitData.append("openingHours[closingTime]", formData.closingTime);
        
        // Location as GeoJSON
        submitData.append("location[type]", "Point");
        submitData.append("location[coordinates][0]", formData.longitude); // Note: longitude first
        submitData.append("location[coordinates][1]", formData.latitude);
        
        // Categories as array
        const categoriesArray = formData.categories.split(',').map(cat => cat.trim());
        categoriesArray.forEach(cat => submitData.append("categories", cat));
        
        submitData.append("gsti", formData.gsti);
        submitData.append("phone", formData.phone);
        submitData.append("image", imageFile);
    
        try {
            const res = await fetch("https://food-website-backend-20z8.onrender.com/api/restaurants", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                    // Don't set Content-Type - let the browser set it automatically
                },
                body: submitData
            });
    
            const data = await res.json();
    
            if (res.ok) {
                toast.success("Restaurant registered successfully ✅");
                navigate('/vendor/Dashboard');
            } else {
                toast.error(data.message || "Failed to register restaurant ❌");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong ❌");
        }
    };

    return (
        <div className="KYCcontainer">
            <form
                onSubmit={handleSubmit}
                style={{ maxWidth: '500px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}
                encType="multipart/form-data"
            >
                <h2>Register Your Restaurant</h2>
                <input type="text" name="name" placeholder="Restaurant Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />

                {/* ✅ Image Upload */}
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                {previewURL && <img src={previewURL} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />}

                <input type="text" name="categories" placeholder="Categories (comma separated)" value={formData.categories} onChange={handleChange} required />
                <input type="text" name="openingTime" placeholder="Opening Time (e.g. 10:00 AM)" value={formData.openingTime} onChange={handleChange} required />
                <input type="text" name="closingTime" placeholder="Closing Time (e.g. 10:00 PM)" value={formData.closingTime} onChange={handleChange} required />
                <input type="text" name="gsti" placeholder="GSTIN Number" value={formData.gsti} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
                <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default VendorKYC;
