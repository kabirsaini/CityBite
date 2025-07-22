import '@/Components/Vendor/Style/Navbar.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [vendor, setVendor] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === "vendor") {
                setVendor(user);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // 🧼 remove user info
        setVendor(null);
        toast.success("Logout successful ✅");
        navigate("/login");
    };

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <nav className="navbar1">
            <div className="navbar-logo1">Gorato</div>
            <ul className="navbar-links1">
                <li>
                    <Link to="/vendor/Dashboard" className={isActive('/vendor/Dashboard') ? 'active' : ''}>Home</Link>
                </li>
                
                {/* <li>
                    <Link to="/vendor/Orders" className={isActive('/vendor/Orders') ? 'active' : ''}>Orders</Link>
                </li> */}
                <li>
                    <Link to="/vendor/AddProducts" className={isActive('/vendor/AddProducts') ? 'active' : ''}>Products</Link>
                </li>
                <li>
                    <Link to="/vendor/UpdateKYC" className={isActive('/vendor/UpdateKYC') ? 'active' : ''}>Update KYC</Link>
                </li>
                <li>
                    <Link to="/vendor/DeleteRestaurant" className={isActive('/vendor/DeleteRestaurant') ? 'active' : ''}>Delete Account</Link>
                </li>
                {vendor && (
                    <li>
                        <Link
                            to="/login"
                            onClick={handleLogout}
                            className={isActive('/login') ? 'active' : ''}
                        >
                            Logout
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
