import '@/Components/User/Style/Mainpage.css';
import { useState } from 'react';
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

  const Iconic = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009493/HyderabadiBiryani_ppsslw.png",
      name: "Hyderabad's Biryani",
      description: "A fragrant rice dish with marinated meat, originating from Hyderabad.",
      city: "Hyderabad",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009519/Rosogulla_nobcjt.png",
      name: "Kolkata's Rosogulla",
      description: "A spongy and sweet dessert made from chhena, originating from West Bengal.",
      city: "Kolkata",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009517/Dhokla_nuhnvk.png",
      name: "Gujrat's Dhokla",
      description: "A steamed rice cake originating from Gujarat.",
      city: "Ahmedabad",
    },

    {
      id: 4,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009515/CholeKulche_lfkvcb.png",
      name: "Amritsar's Chole Kulche",
      description: "A type of leavened Indian bread, originating from Punjab.",
      city: "Amritsar",
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009512/ButterChicken_lgqmsk.png",
      name: "Delhi's Butter Chicken",
      description: "A creamy tomato-based curry with tender chicken pieces, originating from Delhi.",
      city: "Delhi",
    },
    {
      id: 6,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009495/Idli_lhx93s.webp",
      name: "Banglore's Idli",
      description: "A soft and fluffy steamed rice cake, originating from South India.",
      city: "Bangalore",
    },
    {
      id: 7,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009316/Dal-Bhati_gkjzjf.jpg",
      name: "Jaipur's Dal Batti",
      description: "A traditional Rajasthani dish consisting of lentils, baked wheat balls, and sweetened crushed wheat.",
      city: "Jaipur",
    },
    {
      id: 8,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009480/Vada-Pao_ndssmg.jpg",
      name: "Mumbai's Vada Pao",
      description: "A popular street food from Maharashtra, consisting of a spicy potato fritter sandwiched in a bread roll.",
      city: "Mumbai",
    },
  ];

  const Category = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764072132/pngtree-colorful-indian-cuisine-with-naan-on-round-platter-overhead-shot-transparent-png-image_20965104_o119zl.png",
      name: "North Indian",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764072946/Screenshot_2025-11-25_at_5.45.38_PM_hg7a8x.png",
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
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764082314/3d-rendering-of-a-biryani-rice-with-grilled-chicken-pieces-on-transparent-background-png_rgairr.webp",
      name: "Biryani",

    },
    {
      id: 8,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764082314/3d-rendering-of-a-biryani-rice-with-grilled-chicken-pieces-on-transparent-background-png_rgairr.webp",
      name: "Biryani",

    },
    {
      id: 8,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764082314/3d-rendering-of-a-biryani-rice-with-grilled-chicken-pieces-on-transparent-background-png_rgairr.webp",
      name: "Biryani",

    },
    {
      id: 8,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764082314/3d-rendering-of-a-biryani-rice-with-grilled-chicken-pieces-on-transparent-background-png_rgairr.webp",
      name: "Biryani",

    },
    {
      id: 8,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1764082314/3d-rendering-of-a-biryani-rice-with-grilled-chicken-pieces-on-transparent-background-png_rgairr.webp",
      name: "Biryani",

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
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009671/hyderabad_d3gxpf.png",
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
      id: 8,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009645/vishakhapatnam_cafjj7.png",
      name: "Vishakhapatnam",
    },
    {
      id: 9,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009688/udaipur_o20bp8.png",
      name: "Udaipur",
    },
    {
      id: 9,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009688/udaipur_o20bp8.png",
      name: "Udaipur",
    },
    {
      id: 9,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009688/udaipur_o20bp8.png",
      name: "Udaipur",
    },
    {
      id: 9,
      image: "https://res.cloudinary.com/dql26m6d5/image/upload/v1758009688/udaipur_o20bp8.png",
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


        <div className="finder-section">
          <div className="finder-header">
            <h2 style={{ fontFamily: `"Lexend", sans-serif` }}>Find Your City</h2>
          </div>

          <div style={{
            display: "flex",
            overflowX: "auto",
            gap: "12px",
            padding: "10px",
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
                <h2 className="city-name">{city.name}</h2>
              </div>
            ))}
          </div>
        </div>



        <div className="Food-Category">
          <h3>Explore by Category</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns:"repeat(8, 1fr)",
            gap: "12px",
            padding: "10px",
          }}
            className="category-cont">
            {Category.map((restaurant) => (
              <div key={restaurant.id} className="category-card" style={{
                textAlign: "center"
              }}>
                <div className="category-image">
                  <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <p className="category-name">{restaurant.name}</p>
              </div>

            ))}
          </div>
        </div>

        <div>
          <video
            src="https://res.cloudinary.com/dql26m6d5/video/upload/v1764093305/Fresh_From_the_restaurants_to_your_doorsteps_lt7fq5.mp4"
            style={{ width: "100%",  height: "700px", objectFit: "cover", marginTop:"80px",marginBottom:"80px"}}
            autoPlay
            loop
            muted
            playsInline
          />



        </div>


        <div className="mainpage-content">
          <h1>Taste the Legacy — Order Signature Dishes from Famous Cities</h1>
          <div className="restaurant-cont">
            {Iconic.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-image">
                  <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <button className="See-now"
                  onClick={() => {
                    setCity(restaurant.city);
                    navigate(`/results/${restaurant.city}`);
                  }}>
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
