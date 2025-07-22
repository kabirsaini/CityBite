import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Cart from './Components/User/Cart';
import Checkout from './Components/User/CheckoutPage';
import Mainpage from './Components/User/Mainpage';
import Navbar from './Components/User/Navbar';
import OrderSuccess from './Components/User/OrderSuccess';
import Restaurant from './Components/User/Restaurant';
import Results from './Components/User/Results';
import AddProducts from './Components/Vendor/AddProducts';
import DeleteRestaurant from './Components/Vendor/DeleteRestaurant';
import VendorMainpage from './Components/Vendor/Mainpage';
import VendorNavbar from './Components/Vendor/Navbar';
import Orders from './Components/Vendor/Orders';
import UpdateKYC from './Components/Vendor/UpdateKYC';
import VendorKYC from './Components/Vendor/VendorKYC';


function App() {

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(prev => prev.filter((_, index) => index !== indexToRemove));
  };


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
          <Navbar cartCount={cartItems.length} />
          <Mainpage />
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
          < UpdateKYC/>
        </>
      ),
    },
    {
      path: '/vendor/DeleteRestaurant',
      element: (
        <>
          <VendorNavbar />
          < DeleteRestaurant/>
        </>
      ),
    },
    {
      path: '/vendor/AddProducts',
      element: (
        <>
          <VendorNavbar />
          < AddProducts/>
        </>
      ),
    },
    {
      path: '/vendor/Orders',
      element: (
        <>
          <VendorNavbar />
          < Orders/>
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
          <Navbar cartCount={cartItems.length} />
          <Results />
        </>
      )
    },
    {
      path: '/restaurant/:id',
      element: (
        <>
          <Navbar cartCount={cartItems.length} />
          <Restaurant onAddToCart={handleAddToCart} />
        </>
      ),
    },
    {
      path: '/Cart',
      element: (
        <>
          <Navbar cartCount={cartItems.length} />
          <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
        </>
      ),
    },
    {
      path: '/SuccessPage',
      element: (
        <>
          <Navbar  />
          < OrderSuccess/>
        </>
      ),
    },
    {
      path: '/Checkout',
      element: (
        <>
          <Navbar cartCount={cartItems.length} />
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
