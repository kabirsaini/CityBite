import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateKYC = () => {
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

    const [imageFile, setImageFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [restaurantId, setRestaurantId] = useState(null);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("https://food-website-backend-20z8.onrender.com/api/restaurants/my", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    const r = data.restaurant;
                    setRestaurantId(r._id);
                    setCurrentImage(r.image); // Store current image URL

                    setFormData({
                        name: r.name || '',
                        description: r.description || '',
                        street: r.address?.street || '',
                        city: r.address?.city || '',
                        state: r.address?.state || '',
                        pincode: r.address?.pincode || '',
                        categories: r.categories?.join(', ') || '',
                        openingTime: r.openingHours?.openingTime || '',
                        closingTime: r.openingHours?.closingTime || '',
                        gsti: r.gsti || '',
                        phone: r.phone || '',
                        latitude: r.location?.coordinates?.[1] || '', // latitude is at index 1
                        longitude: r.location?.coordinates?.[0] || '' // longitude is at index 0
                    });
                } else {
                    toast.error(data.message || "Failed to fetch restaurant info");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error fetching restaurant");
            }
        };

        fetchRestaurant();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const submitData = new FormData();
        submitData.append("name", formData.name);
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
        submitData.append("location[coordinates][0]", formData.longitude); // longitude first
        submitData.append("location[coordinates][1]", formData.latitude);
        
        // Categories as array
        const categoriesArray = formData.categories.split(',').map(cat => cat.trim());
        categoriesArray.forEach(cat => submitData.append("categories", cat));
        
        submitData.append("gsti", formData.gsti);
        submitData.append("phone", formData.phone);
        
        // Only append image if a new one was selected
        if (imageFile) {
            submitData.append("image", imageFile);
        }

        try {
            const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/restaurants/${restaurantId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: submitData
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Restaurant updated successfully ✅");
                navigate("/vendor/Dashboard");
            } else {
                toast.error(data.message || "Failed to update restaurant ❌");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating ❌");
        }
    };

    return (
        <div className="KYCcontainer">
            <form
                onSubmit={handleSubmit}
                style={{ maxWidth: '500px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}
                encType="multipart/form-data"
            >
                <h2>Update Your Restaurant</h2>
                <input type="text" name="name" placeholder="Restaurant Name" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />

                {/* Image Upload */}
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                {previewURL ? (
                    <img src={previewURL} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                ) : currentImage ? (
                    <div>
                        <p>Current Image:</p>
                        <img
                            src={currentImage}
                            alt="Current"
                            style={{ maxWidth: '100%', height: 'auto' }} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                    </div>
                ) : null}

<div style={{ margin: "16px 0" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Select Restaurant Category:</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                        {["Chinese", "Indian", "Italian", "Korean", "Japanese"].map((cat) => (
                            <label
                                key={cat}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    padding: "6px 12px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    background: formData.categories.includes(cat) ? "#f0f8ff" : "#fff",
                                    boxShadow: formData.categories.includes(cat)
                                        ? "0 0 6px rgba(0, 123, 255, 0.4)"
                                        : "none"
                                }}
                            >
                                <input
                                    type="checkbox"
                                    name="categories"
                                    value={cat}
                                    checked={formData.categories.includes(cat)}
                                    onChange={handleChange}
                                    style={{ cursor: "pointer" }}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>
                
                <input type="text" name="openingTime" placeholder="Opening Time (e.g. 10:00 AM)" value={formData.openingTime} onChange={handleChange} required />
                <input type="text" name="closingTime" placeholder="Closing Time (e.g. 10:00 PM)" value={formData.closingTime} onChange={handleChange} required />
                <input type="text" name="gsti" placeholder="GSTIN Number" value={formData.gsti} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
                <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateKYC;