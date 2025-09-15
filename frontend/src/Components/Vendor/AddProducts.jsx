import '@/Components/Vendor/Style/Product.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddProducts = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        ratings: "",
        isAvailable: true,
        discountPrice: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [products, setProducts] = useState([]);

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            toast.error("Please select an image");
            return;
        }

        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) =>
            submitData.append(key, value)
        );
        submitData.append("image", imageFile);

        try {
            const res = await fetch("https://food-website-backend-20z8.onrender.com/api/products", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: submitData
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Product added successfully ✅");
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    ratings: "",
                    isAvailable: "true",
                    discountPrice: ""
                });
                setImageFile(null);
                fetchProducts(); // refresh list
            } else {
                toast.error(data.message || "Failed to add product ❌");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong ❌");
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch("https://food-website-backend-20z8.onrender.com/api/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setProducts(data.products || []);
            } else {
                toast.error("Failed to fetch products");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error loading products");
        }
    };

    const markAvailable = async (productId) => {
        try {
            const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isAvailable: true })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Marked as available");
                fetchProducts();
            } else {
                toast.error(data.message || "Failed to update availability");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update product");
        }
    };


    const markUnavailable = async (productId) => {
        try {
            const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isAvailable: false })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Marked as unavailable");
                fetchProducts();
            } else {
                toast.error(data.message || "Failed to update availability");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update product");
        }
    };
    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`https://food-website-backend-20z8.onrender.com/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                toast.success("Product deleted successfully ✅");
                fetchProducts();
            } else {
                toast.error("Failed to delete product ❌");
            }

            // Remove deleted product from state
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <div className="product-form">
                <form
                    onSubmit={handleSubmit}
                    className="product-form-inner"
                    encType="multipart/form-data"
                >
                    <h2>Add New Product</h2>
                    <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                    <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />

                    {/* <select name="isAvailable" value={formData.isAvailable} onChange={handleChange}>
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
            </select> */}

                    <input type="text" name="discountPrice" placeholder="Discount Price" value={formData.discountPrice} onChange={handleChange} required />
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                    <button type="submit">Add Product</button>
                </form>
            </div>

            {/* <hr className="product-divider" /> */}

            <div className="product-page">
                <div className="product-row">
                    <div className="product-header">
                        <h3>All Your Products</h3>
                    </div>

                    <div className="product-list">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className={`product-card ${!product.isAvailable ? 'disabled' : ''}`}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <h4>{product.name}</h4>
                                <p>{product.isAvailable ? "Available" : "Not Available"}</p>

                                <div className="product-card-buttons">
                                    {product.isAvailable ? (
                                        <button
                                            onClick={() => markUnavailable(product._id)}
                                            className="unavailable-button"
                                        >
                                            Mark Unavailable
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => markAvailable(product._id)}
                                            className="available-button"
                                        >
                                            Mark Available
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>

    );
};

export default AddProducts;
