

import {jwtDecode} from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [preview, setPreview] = useState(null);
console.log(profilePhoto);
 


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      try {
        const decoded = jwtDecode(token); // Decode the token
        setEmail(decoded.sub);
         // `sub` field contains the email
        console.log("Email from token:", decoded.sub);
      } catch (error) {
        console.error("Invalid token");
        navigate("/login");
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview
      setPreview(URL.createObjectURL(file));

      // Convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9092/api/user/updateprofile",
        {
          email,

          name,
          profilePhotoUrl: profilePhoto,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("names", name);
      if (response.status === 200) {
        console.log("the name paas to profile",name)
        navigate(`/home/${name}`);
      } else {
        alert("Profile update failed.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong.");
    }
  };

  return (


    // <div className="profile-setup">
    //   <h2>Set up your profile</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Your Name"
    //       required
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />

    //     <input
    //       type="file"
    //       accept="image/*"
    //       onChange={handleImageChange}
    //     />

    //     {preview && (
    //       <img
    //         src={preview}
    //         alt="Profile Preview"
    //         width="100"
    //         height="100"
    //         style={{ borderRadius: "50%", marginTop: "10px" }}
    //       />
    //     )}

    //     <button type="submit">Continue</button>
    //   </form>
    // </div>


    <div className="profile-setup">
  <h2 className="profile-title">Set Profile</h2>
  <form onSubmit={handleSubmit} className="profile-form">
    <input
      type="text"
      placeholder="Your Name"
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="profile-input"
    />

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="profile-input"
    />

    {preview && (
      <img
        src={preview}
        alt="Profile Preview"
        width="100"
        height="100"
        className="profile-preview"
      />
    )}

    <button type="submit" className="profile-button">Continue</button>
  </form>
</div>

  );
};

export default Profile;
