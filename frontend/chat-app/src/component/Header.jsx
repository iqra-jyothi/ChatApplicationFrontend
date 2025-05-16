

import React from 'react';
import { RiLogoutCircleLine } from "react-icons/ri";
const Header = ({ user, searchTerm, onSearchChange, onLogout }) => {
    console.log("user in header",user)
  return (

<header className="custom-header">
  {/* Top Row: Avatar + Username */}
  <div className="header-top">
    <div className="user-info">
      <img
        src={user?.profilePhotoUrl || '/default-avatar.png'}
        alt="Profile"
        className="user-avatar"
      />
      <span className="username">{user}</span>
    </div>
  </div>

  {/* Title */}
  <h1 className="app-title">PERSONAL CHAT APP</h1>

  {/* Search Bar */}
  <div className="search-bar">
    <span className="search-icon"></span>
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <button className="logout-button" onClick={onLogout}><RiLogoutCircleLine /></button>
  </div>
</header>


  );
};

export default Header;