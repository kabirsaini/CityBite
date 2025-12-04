import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Cart from './Components/User/Cart';
import Checkout from './Components/User/CheckoutPage';
import Mainpage from './Components/User/Mainpage';
import MyOrders from './Components/User/MyOrders';
import Navbar from './Components/User/Navbar';
import OrderSuccess from './Components/User/OrderSuccess';
import Profile from './Components/User/Profile';
import Restaurant from './Components/User/Restaurant';
import Results from './Components/User/Results';
import './Components/User/Style/Mainpage.css';
import AddProducts from './Components/Vendor/AddProducts';
import DeleteRestaurant from './Components/Vendor/DeleteRestaurant';
import VendorMainpage from './Components/Vendor/Mainpage';
import VendorNavbar from './Components/Vendor/Navbar';
import Orders from './Components/Vendor/Orders';
import UpdateKYC from './Components/Vendor/UpdateKYC';
import VendorKYC from './Components/Vendor/VendorKYC';


function App() {

  const [cartItems, setCart] = useState({
    products: [],
    totalPrice: 0
});

const [city, setCity] = useState('');
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    const res = await fetch("https://food-website-backend-20z8.onrender.com/api/cart", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setCart(data);
  };


  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Reverse Geocoding API (Free)
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      const data = await res.json();
      setCity(data.city || data.locality || "City not found");

      if (city.trim() !== '') {
        navigate(`/results/${city}`);
      }

    });
  };

  useEffect(() => {
    fetchCart();
    getLocation();
  },[]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Signup />
      ),
    },
    {
      path: '/MainPage',
      element: (
        <>
          <Navbar cartCount={cartItems.products.length} />
          <Mainpage />
        </>
      ),
    },
    {
      path: '/Profile',
      element: (
        <>
          <Navbar cartCount={cartItems.products.length} />
          <Profile />
        </>
      ),
    },
    {
      path: '/MyOrders',
      element: (
        <>
          <Navbar cartCount={cartItems.products.length} />
          <MyOrders />
        </>
      ),
    },
    {
      path: '/vendor/Dashboard',
      element: (
        <>
          <VendorNavbar />
          <VendorMainpage />
        </>
      ),
    },
    {
      path: '/vendor/KYC',
      element: (
        <>
          <VendorKYC />
        </>
      ),
    },
    {
      path: '/vendor/UpdateKYC',
      element: (
        <>
          <VendorNavbar />
          < UpdateKYC />
        </>
      ),
    },
    {
      path: '/vendor/DeleteRestaurant',
      element: (
        <>
          <VendorNavbar />
          < DeleteRestaurant />
        </>
      ),
    },
    {
      path: '/vendor/AddProducts',
      element: (
        <>
          <VendorNavbar />
          < AddProducts />
        </>
      ),
    },
    {
      path: '/vendor/Orders',
      element: (
        <>
          <VendorNavbar />
          < Orders />
        </>
      ),
    },
    {
      path: '/Login',
      element: (
        <Login />

      ),
    },
    {
      path: '/Signup',
      element: (
        <Signup />

      ),
    },


    {
      path: '/results/:city',
      element: (
        <>
          <Navbar cartCount={cartItems.products.length} />
          <Results />
        </>
      )
    },
    {
      path: "/results/category/:cat",
      
      element: (
        <>
        <Navbar cartCount={cartItems.products.length} />
        <Results />
        </>
      )
    },

    {
      path: '/restaurant/:id',
      element: (
        <>
          <Navbar cartCount={cartItems.products.length} />
          <Restaurant />
        </>
      ),
    },
    {
      path: '/Cart',
      element: (
        <>
          <Navbar cartCount={cartItems.products.length} />
          <Cart cartItems={cartItems} city={city}/>
        </>
      ),
    },
    {
      path: '/SuccessPage',
      element: (
        <>
          <Navbar />
          < OrderSuccess />
        </>
      ),
    },
    {
      path: '/Checkout',
      element: (
        <>
          <Navbar cartCount={cartItems.products.length} />
          <Checkout />
        </>
      ),
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
