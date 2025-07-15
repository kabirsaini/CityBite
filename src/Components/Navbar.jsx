import React from 'react';
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
import './Style/Navbar.css';

const Navbar = ({cartCount}) => {
    return (
        <>
        <nav className="navbar">
            <div className="navbar-logo">Gorato</div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Login">Sign Up</Link></li>
                <li><Link to="/Cart"><IoMdCart /><span className="cart-count">{cartCount}</span></Link></li>
                
            </ul>
        </nav>
        </>
    );
};

export default Navbar;
