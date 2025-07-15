import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Cart from './Components/Cart';
import Checkout from './Components/CheckoutPage';
import Login from './Components/Login';
import Mainpage from './Components/Mainpage';
import Navbar from './Components/Navbar';
import Restaurant from './Components/Restaurant';
import Results from './Components/Results';

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
        <>
          <Navbar cartCount={cartItems.length} />
          <Mainpage />
        </>
      ),
    },
    {
      path: '/Login',
      element: (
        <>
          <Navbar cartCount={cartItems.length} />
          <Login />
        </>
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
    <RouterProvider router={router} />
  );
}

export default App;
