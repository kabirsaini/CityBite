import '@/Components/User/Style/Navbar.css';
import { useEffect, useRef, useState } from 'react';
import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({ cartCount }) => {
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/users/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);




    const handledropdown = () => {
        setOpen(!open);
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser({});
        toast.success("Logout successful ✅");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">CityBite</div>
            <ul className="navbar-links">
                <li><Link to="/MainPage">Home</Link></li>


                <div className="dropdown-container" ref={dropdownRef}>
                    <button
                        onClick={handledropdown}
                        className="dropdown-button">
                        <img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764014202/ChatGPT_Image_Nov_25_2025_01_26_27_AM_z2c1hu.png" alt="avatar" height={35} width={35} />
                    </button>


                    {open && (
                        <div className="dropdown-menu">
                            <p style={{marginTop:"10px" ,marginLeft: "15px",  marginBottom: "10px", fontFamily: `"DM Serif Text", serif`, fontSize: "16px", fontWeight:"600" }}>  Hello, {user?.name}</p>
                            <button
                                onClick={() => {
                                    navigate("/Profile");
                                    setOpen(false);
                                }}
                                className="dropdown-item"
                            >
                                Profile
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/MyOrders");
                                    setOpen(false);
                                }}
                                className="dropdown-item"
                            >
                                My Orders
                            </button>

                            <button
                                onClick={() => {
                                    handleLogout();
                                    setOpen(false);
                                }}
                                className="dropdown-item"
                            >
                                Logout
                            </button>

                        </div>
                    )}
                </div>
                <li>
                    <Link to="/Cart" className="cart-link">
                        <IoMdCart size="25px" style={ {marginTop: "10px"}}/>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
