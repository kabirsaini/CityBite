import React, { useEffect, useState } from "react";
import '@/Components/User/Style/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user details + orders
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUser(data.user);
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-page">
      {user ? (
        <>
          {/* User Info */}
          <div className="profile-info card">
            <h2>Your Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
          </div>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default Profile;
