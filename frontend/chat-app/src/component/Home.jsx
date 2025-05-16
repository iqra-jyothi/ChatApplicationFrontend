



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const { name } = useParams();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal")
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const email = decoded.sub;
      console.log("the email is ", email);
      try {
        const res = await axios.get(`http://localhost:9092/api/user/profile/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("the current user", name);
        setCurrentUser(name);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:9092/api/user/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurrentUser();
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.email !== currentUser?.email &&
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="chat-app-container">
  {/* Header */}
  <Header
    user={currentUser}
    searchTerm={searchTerm}
    onSearchChange={setSearchTerm}
    onLogout={handleLogout}
  />

  {/* Main layout below header */}
  <div className="user-list-wrapper">
    <h2 className="section-title">All Users</h2>

    {/* Chatroom Option */}
    <div
      onClick={() => navigate('/chatroom')}
      className="chatroom-item"
    >
      <img
        src="/chatroom-icon.png"
        alt="Chatroom"
        className="avatar"
      />
      <div className="chat-info">
        <span className="chat-name">Public Chatroom</span>
        <p className="chat-preview">Join the global conversation</p>
      </div>
      <span className="message-count">2</span>
    </div>

    {/* List of users */}
    {filteredUsers.map((user) => (
      <div
        key={user.name}
        className="chatroom-item"
        onClick={() =>
          navigate('/chat', {
            state: {
              selectedUser: user,
              users: filteredUsers,
            },
          })
        }
      >
        <img
          src={user.profilePhotoUrl || '/default-avatar.png'}
          alt="Avatar"
          className="avatar"
        />
        <div className="chat-info">
          <span className="chat-name">{user.name}</span>
          <p className="chat-preview"></p>
        </div>
        <span className="message-count"></span>
      </div>
    ))}
  </div>
</div>

  );
};

export default Home;
