import "@/Components/User/Style/Mainpage.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { FaSearch } from "react-icons/fa";


function Mainpage() {
  const images = [
    "north-indian.png",
    "east-indian.png",
    "west-indian.webp",
    "south-indian.webp",
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
      image: "public/HyderabadiBiryani.png",
      name: "Hyderabadi Biryani",
      description: "A fragrant rice dish with marinated meat, originating from Hyderabad.",
      city: "Hyderabad",
    },
    {
      id: 2,
      image: "public/Rosogulla.png",
      name: "Rosogulla",
      description: "A spongy and sweet dessert made from chhena, originating from West Bengal.",
      city: "Kolkata",
    },
    {
      id: 3,
      image: "public/Dhokla.png",
      name: "Dhokla",
      description: "A steamed rice cake originating from Gujarat.",
      city: "Ahmedabad",
    },

    {
      id: 4,
      image: "public/CholeKulche.png",
      name: "Chole Kulche",
      description: "A type of leavened Indian bread, originating from Punjab.",
      city: "Amritsar",
    },
    {
      id: 5,
      image: "public/ButterChicken.png",
      name: "Butter Chicken",
      description: "A creamy tomato-based curry with tender chicken pieces, originating from Delhi.",
      city: "Delhi",
    },
    {
      id: 6,
      image: "public/Idli.webp",
      name: "Idli",
      description: "A soft and fluffy steamed rice cake, originating from South India.",
      city: "Bangalore",
    },
    {
      id: 7,
      image: "public/Dal-Bhati.png",
      name: "Dal Batti Churma",
      description: "A traditional Rajasthani dish consisting of lentils, baked wheat balls, and sweetened crushed wheat.",
      city: "Jaipur",
    },
    {
      id: 8,
      image: "public/Vada-Pao.jpg",
      name: "Vada Pao",
      description: "A popular street food from Maharashtra, consisting of a spicy potato fritter sandwiched in a bread roll.",
      city: "Mumbai",
    },

  ];

  const Cities = [
    {
      id: 1,
      image: "public/delhi-icon.png",
      name: "Delhi",
    },
    {
      id: 2,
      image: "public/banglore.png",
      name: "Bangalore",
    },
    {
      id: 3,
      image: "public/mumbai.png",
      name: "Mumbai",
    },

    {
      id: 4,
      image: "public/chennai.png",
      name: "Chennai",
    },
    {
      id: 5,
      image: "public/kolkata.png",
      name: "Kolkata",

    },
    {
      id: 6,
      image: "public/hyderabad.png",
      name: "Hyderabad",
    },
    {
      id:7,
      image: "public/amritsar.png",
      name: "Amritsar",
    },
    {
      id:8,
      image: "public/jaipur.png",
      name: "Jaipur",
    },
    {
      id:8,
      image: "public/vishakhapatnam.png",
      name: "Vishakhapatnam",
    },
    {
      id:9,
      image: "public/udaipur.png",
      name: "Udaipur",
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
            placeholder=" Search Your city"
            className="find-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                  e.preventDefault(); // Prevents page refresh
                  handleSearch();
              }
          }}
          />

          <button  className="find-button" onClick={handleSearch}><FaSearch className="search-icon" /> Search</button>

        </div>

        <div className="finder-section">
          <div className="finder-header">
            <h2>Find Your City</h2>
          </div>

          <div className="finder-container">
            {Cities.map((city) => (
            <div key={city.id} className="finder-card">
              <div className="city-image" onClick={()=>{
                setCity(city.name);
                navigate(`/results/${city.name}`);
              }}>
                <img src={`/${city.image}`} alt={city.name} />
              </div>
              <h2 className="city-name">{city.name}</h2>
            </div>
            ))}
          </div>
        </div>

        <div className="mainpage-content">
          <h1>Taste the Legacy — Order Signature Dishes from Famous Cities</h1>
          <div className="restaurant-cont">
            {Iconic.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-image">
                  <img src={`/${restaurant.image}`} alt={restaurant.name} />
                </div>
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <p className="restaurant-description">{restaurant.description}</p>
                <p className="restaurant-city">
                  <strong>City:</strong> {restaurant.city}
                </p>
                <button className="See-now"
                  onClick={() => {
                    setCity(restaurant.city);
                    navigate(`/results/${restaurant.city}`);
                  }}>
                  See Now
                </button>
              </div>

            ))}
          </div>
        </div>


        <div className="footer">
          <div className="footer-header">
            <h2>CityBite</h2>
          </div>

          <div className="footer-content">
            <div className="about-us">
              <h3>About Us</h3>
              <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                Learn More
              </Link>
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
        <div className="footer-bottom">
          <p>© 2023 CityBite. All rights reserved.</p>
        </div>
      </div>
    </>
  )

}

export default Mainpage;
