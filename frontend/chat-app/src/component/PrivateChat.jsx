

import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const PrivateChat = () => {
  const { state } = useLocation();
  const { selectedUser } = state || {};
  const token = localStorage.getItem('token');
  const currentUserEmail = jwtDecode(token).sub;
  
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const stompClientRef = useRef(null);
  const messageEndRef = useRef(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9092/api/message/private/${currentUserEmail}/${selectedUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load private messages', err);
      }
    };

    fetchHistory();
  }, [selectedUser, currentUserEmail, token]);

  // Connect to WebSocket
  useEffect(() => {
    const socket = new SockJS(`http://localhost:9092/ws?token=${token}`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        console.log("the suscrbe started");
        stompClient.subscribe('/user/queue/private', (msg) => {
          console.log("the subscrib")
          const received = JSON.parse(msg.body);
          console.log(msg)
          if (
            (received.senderEmail === selectedUser.email &&
              received.receiverEmail === currentUserEmail) ||
            (received.receiverEmail === selectedUser.email &&
              received.senderEmail === currentUserEmail)
          ) {
            setMessages((prev) => [...prev, received]);
          }
        });
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => stompClient.deactivate();
  }, [selectedUser, currentUserEmail, token]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const message = {
      senderEmail: currentUserEmail,
      receiverEmail: selectedUser.email,
      content: text,
      messageType: 'PRIVATE',
      timestamp: new Date().toISOString(),
    };

    stompClientRef.current.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(message),
    });

    setMessages((prev) => [...prev, { ...message, timestamp: new Date().toISOString() }]);
    setText('');
  };
  console.log("the reciver email",selectedUser.email)

  return (
    <div className="chat-container">
    {/* Header */}
    <div className="chat-header">
      <img
        src={selectedUser.profilePhotoUrl || 'https://via.placeholder.com/40'}
        alt="Profile"
        className="chat-avatar"
      />
      <span className="chat-user-name">{selectedUser.name}</span>
    </div>

    {/* Chat Area */}
    <div className="chat-messages">
      {messages.map((msg, idx) => {
        const isSender = msg.senderEmail === currentUserEmail;
        return (
          <div
            key={idx}
            className={`chat-message ${isSender ? 'sent' : 'received'}`}
          >
            <div key={idx} className={`chat-message ${isSender ? 'sent' : 'received'}`}>
  <div className={`message-box ${isSender ? 'sender' : 'receiver'}`}>
    <div className="message-content">{msg.content}</div>
  </div>
  <div >
    {new Date(msg.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}
  </div>
</div>

          </div>
        );
      })}
      <div ref={messageEndRef} />
    </div>

    {/* Input Area */}
    <div className="chat-input-area">
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <div className="send-icon-container" onClick={sendMessage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="send-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  </div>
    );
    

};

export default PrivateChat;
