import { Navbar } from "../Navbar";
import "./Profile.css";
import HeatMapProfile from "./HeatMapProfile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profileData, setProfileData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You are not authorize!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
        const url = "http://localhost:3000/users/userProfile";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();
        setProfileData(data);
        // console.log(data.username);
      } catch (error) {
        console.log("Error during fetching profile: ", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="profile-container">
        <div className="left-profile-container">
          <img src="./profile.png" alt="profile image" />
          <h2>{profileData.username}</h2>
          <button>Edit profile</button>
          <div>
            <p>
              <span>0</span> followers
            </p>
            <p>
              <span>2</span> following
            </p>
          </div>
        </div>
        <div className="right-profile-container">
          <h2>Recent Contributions</h2>
          <div className="heat-map-section">
            <HeatMapProfile />
          </div>
        </div>
      </section>
    </>
  );
};
