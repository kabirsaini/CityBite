import '@/Components/User/Style/Navbar.css';
import { useEffect, useState } from 'react';
import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({ cartCount }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        toast.success("Logout successful ✅");
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">Gorato</div>
                <ul className="navbar-links">
                    <li><Link to="/MainPage">Home</Link></li>

                    
                    {user && <li>Hello, {user.name}</li>}

                    {!user && (
                        <li><Link to="/Signup">Sign Up</Link></li>
                    )}


                    {user && (
                        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            Logout
                        </li>
                    )}

                    <li>
                        <Link to="/Cart">
                            <IoMdCart />
                            <span className="cart-count">{cartCount}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
