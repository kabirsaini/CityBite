import '@/Components/User/Style/Results.css';
import '@/Components/User/Style/Mainpage.css';

import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


function Mainpage() {
  const images = [
    "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009849/north-indian_du7yla.png",
    "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009833/east-indian_pxxozk.png",
    "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009838/west-indian_qvrqgf.png",
    "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009842/south-indian_nnswcz.webp",
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

  const Category = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764072132/pngtree-colorful-indian-cuisine-with-naan-on-round-platter-overhead-shot-transparent-png-image_20965104_o119zl.png",
      name: "North Indian",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764881583/Screenshot_2025-11-25_at_5.45.38_PM_hg7a8x_mrgeb3.png",
      name: "South Indian",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764072920/eating-noodles-3d-icon-png-download-8529396_nne6dm.webp",
      name: "Chinese",

    },

    {
      id: 4,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764073192/tacos-icon-isolated-3d-transparent-free-png_ghb18b.png",
      name: "Mexican",
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764073327/pizza-3d-realistic-icon-illustration-isolated-on-transparent-background-png_ydmukj.webp",
      name: "Italian",

    },
    {
      id: 6,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764073425/cappuccino-coffee-3d-icon-png-download-5804801_bnulr4.webp",
      name: "Coffee",
    },
    {
      id: 7,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764073459/birthday-cake-3d-icon-png-download-5449100_qaivch.webp",
      name: "Cakes",

    },
    {
      id: 8,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764325737/seafood-3d-icon-png-download-8565569_zrozab.webp",
      name: "Seafood",

    },
    {
      id: 9,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764325877/samosa-3d-icon-png-download-9656953_m7d57l.webp",
      name: "Indian Snacks",

    },
    {
      id: 10,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764082314/3d-rendering-of-a-biryani-rice-with-grilled-chicken-pieces-on-transparent-background-png_rgairr.webp",
      name: "Biryani",

    },
    {
      id: 11,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764326103/pngtree-bridge-rice-noodles-png-transparent-layer-material-png-image_7240896_w3yzi3.png",
      name: "Mughlai",

    },
    {
      id: 12,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764327910/dessert-3d-icon-png-download-7049902_dimi15.webp",
      name: "Desserts",
    },
    {
      id: 13,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764327984/thailand-food-3d-icon-png-download-9684794_kgntgf.webp",
      name: "Thai",
    },
    {
      id: 14,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764882264/Screenshot_2025-12-05_at_2.29.20_AM_aygbap.png",
      name: "Punjabi",
    },
    {
      id: 15,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764327989/rabokki-3d-icon-png-download-9133006_ecr32f.webp",
      name: "Korean",
    },
    {
      id: 16,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764328171/3d-icon-of-a-vibrant-salad-in-a-bowl-featuring-fresh-tomatoes-cucumbers-lettuce-onions-and-carrots-with-a-fork-isolated-on-transparent-background-free-png_ygcd0z.webp",
      name: "Salad",
    },
  ];

  const Cities = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009679/delhi-icon_xp23iy.webp",
      name: "Delhi",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009674/banglore_djzygm.png",
      name: "Bangalore",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009641/mumbai_ewzmeq.png",
      name: "Mumbai",
    },

    {
      id: 4,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009676/chennai_rvzwmt.webp",
      name: "Chennai",
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009658/kolkata_ycjats.png",
      name: "Kolkata",

    },
    {
      id: 6,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764880248/copy_of_hyderabad_d3gxpf_de2b90.jpg",
      name: "Hyderabad",
    },
    {
      id: 7,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009661/amritsar_h2rta5.webp",
      name: "Amritsar",
    },
    {
      id: 8,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009647/jaipur_w0v8rd.webp",
      name: "Jaipur",
    },
    {
      id: 9,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009645/vishakhapatnam_cafjj7.png",
      name: "Vishakhapatnam",
    },
    {
      id: 10,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009688/udaipur_o20bp8.png",
      name: "Udaipur",
    },
    {
      id: 11,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764880507/Screenshot_2025-12-05_at_2.04.59_AM_iakoum.png",
      name: "Chandigarh",
    },
    {
      id: 12,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764880615/Screenshot_2025-12-05_at_2.06.49_AM_w4oa3m.png",
      name: "Shimla",
    },
    {
      id: 13,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764880835/Screenshot_2025-12-05_at_2.09.14_AM_znbsd4.png",
      name: "Agra",
    }
  ];

  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim() !== '') {
      navigate(`/results/${city}`);
    }
  }
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
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
    if (!city) {
      return;
    }
    const fetchIconicRestaurants = async () => {

      try {
        const res = await fetch(`https://food-website-backend-20z8.onrender.com/api/restaurants/city/${city}`);
        const data = await res.json();

        if (!data) {
          throw new Error("No data found");
        }

        setRestaurants(data.restaurants || []);
      }
      catch (err) {
        console.error(err);
      }
    }
    fetchIconicRestaurants();
  }, [city]);



  return (
    <>
      <div className="Mainpage">
        <div className="top-container">


          <div className="slider-container">
            <div className="slider-header">
              <p id="p1">Crave </p>
              <p id="p1">Better</p>
              <p id="p1"> Experiences</p>

              <button className='contact-us' onClick={scrollToBottom}>
                Connect with us
                <img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764020858/ChatGPT_Image_Nov_25_2025_03_16_48_AM_hpuasp.png" alt="" height={30} width={30} />
              </button>
            </div>

            <div className="custom-slider">
              <Slider {...settings}>
                {images.map((img, idx) => (
                  <div key={idx} className="image-slide">
                    <img src={img} alt={`Slide ${idx}`} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="slider-container2">
            <div className="discount-container">
              <div className='discount-text'>
                <p id="p2">Get </p>
                <p id="p2">Upto 10% Off!</p>
                <p style={{ marginTop: "5px" }}>Use Code: <span style={{ fontWeight: "700" }}>CITYBITE10</span></p>
              </div>
              <div>

                <img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764009051/ChatGPT_Image_Nov_25_2025_12_00_36_AM_uubhye.png" alt="dis" height={100} width={100} />
              </div>
            </div>

            <div className="discount-container">
              <div className='discount-text'>
                <p id="p2">India's  </p>
                <p id="p2">First Choice!</p>

              </div>
              <div>

                <img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764016628/Flag_of_India.svg_niynnf.png" alt="dis" height={70} width={100} />
              </div>
            </div>

            <div className="discount-container3">
              <div className='discount-text'>
                <p id="p2">Our</p>
                <p id="p2">Brand Partners</p>
              </div>
              <div>

                <img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764018272/Screenshot_2025-11-25_at_2.34.17_AM_umjmlf.png" alt="dis" height={80} width={90} />
              </div>
            </div>


          </div>



          <div className="finder">
            <button onClick={getLocation} className="location-div">
              <img src="https://res.cloudinary.com/dql26m6d5/image/upload/v1764007370/pngtree-3d-map-location-icon-isolate-on-transparent-background-png-image_14200026_gy8dnv.png" alt="loc" height={30} width={30} />
              <h2>Find Your Location</h2>
            </button>

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

            <button className="find-button" onClick={handleSearch}><FaSearch className="search-icon" /> Search</button>

          </div>

        </div>


         {/* Find Your CITY */}

        <div className="finder-section">
          <div className="finder-header">
            <h3 style={{  }}>Find Your City</h3>
          </div>

          <div style={{
            display: "flex",
            overflowX: "auto",
            gap: "12px",
            scrollBehavior: "smooth",
          }}
            className="hide-scrollbar">
            {Cities.map((city) => (
              <div key={city.id} className="finder-card" style={{
                minWidth: "80px",
                padding: "10px",
                textAlign: "center",
                flexShrink: 0,
              }}>
                <div className="city-image" onClick={() => {
                  setCity(city.name);
                  navigate(`/results/${city.name}`);
                }}>
                  <img src={city.image} alt={city.name} />
                </div>
                <p className="city-name">{city.name}</p>
              </div>
            ))}
          </div>
        </div>



        <div className="Food-Category" style={{marginTop: "60px",}}>
          <h3>Explore by Category</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: "12px",
            padding: "10px",
            
          }}
            className="category-cont">
            {Category.map((cat) => (
              <div key={cat.id} className="category-card" style={{
                textAlign: "center"
              }}>
                <div className="category-image" onClick={() => {
                  navigate(`/results/category/${encodeURIComponent(cat.name)}`);
                }} style={{backgroundColor: "rgb(238 244 249)" , borderRadius: "15px"}}>
                  <img src={cat.image} alt={cat.name} />
                </div>
                <p className="category-name">{cat.name}</p>
              </div>

            ))}
          </div>
        </div>

        <div >
          <video
            src="https://res.cloudinary.com/dql26m6d5/video/upload/v1764093305/Fresh_From_the_restaurants_to_your_doorsteps_lt7fq5.mp4"
            style={{ width: "100%", height: "600px", objectFit: "cover", marginTop: "80px", marginBottom: "80px" }}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div style={{
          display: "flex",
          marginLeft: "40px"
        }
        }><h2>Best restaurants in your city</h2></div>
        <div className="restaurant-cont2">

          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="restaurant-card1"
              style={{ cursor: 'pointer' }}
            >
              <div className="restaurant-image">
                <img src={restaurant.image} alt={restaurant.name} />
              </div>
              <div className='details'>
                <h2 className="restaurant1-name">{restaurant.name}</h2>
                <p className="restaurant1-category">
                  {restaurant.categories.join(", ")}
                </p>

                <p className="restaurant1-city">
                  <strong>City:</strong> {restaurant.address?.city}
                </p>
              </div>
            </div>
          ))}
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
