import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Style/Mainpage.css";


function Mainpage() {
  const images = [
    "north-indian.png",
    "east-indian.png",
    "west-indian.webp",
    "east-indian.png",
  ];

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear"
  };

  const Iconic = [
    {
      id: 1,
      name: "Hyderabadi Biryani",
      description: "A fragrant rice dish with marinated meat, originating from Hyderabad.",
      city: "Hyderabad",
    },
    {
      id: 2,
      name: "Rosogulla",
      description: "A spongy and sweet dessert made from chhena, originating from West Bengal.",
      city: "Kolkata",
    },
    {
      id: 3,
      name: "Dhokla",
      description: "A steamed rice cake originating from Gujarat.",
      city: "Ahmedabad",
    },

    {
      id: 4,
      name: "Chole Kulche",
      description: "A type of leavened Indian bread, originating from Punjab.",
      city: "Amritsar",
    },
    {
      id: 5,
      name: "Butter Chicken",
      description: "A creamy tomato-based curry with tender chicken pieces, originating from Delhi.",
      city: "Delhi",
    },
    {
      id: 6,
      name: "Idli",
      description: "A soft and fluffy steamed rice cake, originating from South India.",
      city: "Bangalore",
    }

  ];

  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim() !== '') {
      navigate(`/results/${city}`);
    }
  }

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx} className="image-slide">
              <img src={img} alt={`Slide ${idx}`} style={{ width: '100%', height: '70vh', objectFit: 'cover', marginTop: '10px' }} />
            </div>
          ))}
        </Slider>

        <div className="finder">
          <h2>Find Your Favorite Food in your city</h2>
          <input
            type="text"
            placeholder="Search Your city"
            className="find-input"
            value={city}
            onChange={(e) => setCity(e.target.value)} />

          <button className="find-button" onClick={handleSearch}>Search</button>

        </div>

        <div className="mainpage-content">
          <h1>Order Iconic Dishes Across India</h1>
          <div className="restaurant-cont">
            {Iconic.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-image">
                  <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <p className="restaurant-description">{restaurant.description}</p>
                <p className="restaurant-city">
                  <strong>City:</strong> {restaurant.city}
                </p>
              </div>
            ))}
          </div>
        </div>


        <div className="footer">
          <div className="footer-header">
            <h2>Gurato</h2>
          </div>

          <div className="footer-content">
            <div className="about-us">
              <h3>About Us</h3>
              <Link to="/about">Learn More</Link>
            </div>

            <div className="footer-connect">
              <h3>Connect With Us</h3>
              <div className="social">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
        <div className="footer-bottom" style={{ textAlign: 'center', padding: '10px 0' }}>
          <p>© 2023 Gurato. All rights reserved.</p>
        </div>
      </div>
    </>
  )

}

export default Mainpage;
