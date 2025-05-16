

// import React, { useState, useEffect, useRef } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// const Chatroom = () => {
//   const [connected, setConnected] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [currentUserEmail, setCurrentUserEmail] = useState("");
//   const [currentUserName, setCurrentUserName] = useState("");

//   const stompClientRef = useRef(null);
//   const bottomRef = useRef();

//   const token = localStorage.getItem("token");
//   const name = localStorage.getItem("names");

//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setCurrentUserEmail(decoded.sub);
//         if (name) setCurrentUserName(name);
//       } catch (err) {
//         console.error("❌ Invalid token:", err.message);
//       }
//     }
//   }, [token, name]);

//   // Fetch public message history
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await axios.get("http://localhost:9092/api/message/public", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const sortedMessages = response.data.sort(
//           (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//         );

//         setMessages(sortedMessages);
//       } catch (error) {
//         console.error("❌ Failed to fetch chat history:", error);
//       }
//     };

//     fetchChatHistory();
//   }, [token]);

  


//   useEffect(() => {
//     if(!token) return;
//     const formattedtoken = `Bearer ${token}`;
//     const encodedToken = encodeURIComponent(formattedtoken);
//     const socket = new SockJS(`http://localhost:9092/ws?token=${encodedToken}`);
//     const stompClient = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       onConnect: () => {
//         console.log("✅ Connected to WebSocket");
//         setConnected(true);


//         console.log("Trying to subscribe to /topic/public");
//         stompClient.subscribe("/topic/public", (message) => {
//           // const payload = JSON.parse(message.body);
//           // console.log("Received public message:", payload);
//           console.log("Raw message body:", message); // Log the raw message
//           try {
//             const newMessage = JSON.parse(message.body);
//             console.log("the new message", newMessage); // Log the parsed message
//             setMessages((prev) => [...prev, newMessage]);
//           } catch (error) {
//             console.error("❌ Error parsing message:", error); // Handle any JSON parsing errors
//           }
//         });
        
// console.log("Subscribed to /topic/public");
        
//       },
//       onDisconnect: () => {
//         console.log("❌ Disconnected");
//         setConnected(false);
//       },
//       onStompError: (frame) => console.error("❗ STOMP Error:", frame),
//       onWebSocketError: (error) => console.error("❗ WebSocket Error:", error),
//     });
  
//     stompClient.activate();
//     stompClientRef.current = stompClient;
  
//     return () => {
//       stompClient.deactivate();
//     };
//   }, [token]);
  

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (!stompClientRef.current || !connected || message.trim() === "") return;

//     const msgObject = {
//       // senderEmail: currentUserEmail,
//       senderName: currentUserName,
//       content: message,
//       messageType: "PUBLIC",
      
//       timestamp: new Date().toISOString(),
//     };

//     stompClientRef.current.publish({
//       destination: "/app/chat.send",
//       body: JSON.stringify(msgObject),
//     });

//     setMessage("");
//   };
//   console.log("the message",message)
//   console.log("the message",messages)
//   return (
//     <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#f4f4f4" }}>
//       <div style={{ padding: "1rem", background: "#007bff", color: "white", textAlign: "center", fontSize: "1.5rem" }}>
//         Chatroom
//       </div>

//       <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
//         {messages.map((msg, index) => {
//           const isCurrentUser = msg.senderEmail === currentUserEmail;
//           return (

//             <div
//               key={index}
//               style={{
//                 display: "flex",
//                 justifyContent: isCurrentUser ? "flex-end" : "flex-start",
//                 marginBottom: "1rem",
//               }}
//             >
//               <div
//                 style={{
//                   background: isCurrentUser ? "#007bff" : "#e4e6eb",
//                   color: isCurrentUser ? "white" : "black",
//                   borderRadius: "10px",
//                   padding: "0.75rem",
//                   maxWidth: "60%",
//                   textAlign: "left",
//                 }}
//               >
//                 <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
//                   {isCurrentUser ? "You" : msg.senderName || msg.senderEmail}
//                 </div>
//                 <div>{msg.content}</div>
//                 <div style={{ fontSize: "0.75rem", marginTop: "0.5rem", textAlign: "right" }}>
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </div>

//       <div style={{ padding: "1rem", borderTop: "1px solid #ccc", background: "white", display: "flex" }}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message..."
//           style={{
//             flex: 1,
//             padding: "0.75rem",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             marginRight: "0.5rem",
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           disabled={!connected}
//           style={{
//             background: "#007bff",
//             color: "white",
//             padding: "0.75rem 1rem",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatroom;




import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Chatroom = () => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");

  const stompClientRef = useRef(null);
  const bottomRef = useRef();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("names");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserEmail(decoded.sub);
        if (name) setCurrentUserName(name);
      } catch (err) {
        console.error("❌ Invalid token:", err.message);
      }
    }
  }, [token, name]);

  // Fetch public message history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get("http://localhost:9092/api/message/public", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sortedMessages = response.data.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        setMessages(sortedMessages);
      } catch (error) {
        console.error("❌ Failed to fetch chat history:", error);
      }
    };

    fetchChatHistory();
  }, [token]);

  


  useEffect(() => {
    if(!token) return;
    const formattedtoken = `Bearer ${token}`;
    const encodedToken = encodeURIComponent(formattedtoken);
    const socket = new SockJS(`http://localhost:9092/ws?token=${encodedToken}`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        setConnected(true);


        console.log("Trying to subscribe to /topic/public");
        stompClient.subscribe("/topic/public", (message) => {
          // const payload = JSON.parse(message.body);
          // console.log("Received public message:", payload);
          console.log("Raw message body:", message); // Log the raw message
          try {
            const newMessage = JSON.parse(message.body);
            console.log("the new message", newMessage); // Log the parsed message
            setMessages((prev) => [...prev, newMessage]);
          } catch (error) {
            console.error("❌ Error parsing message:", error); // Handle any JSON parsing errors
          }
        });
        
console.log("Subscribed to /topic/public");
        
      },
      onDisconnect: () => {
        console.log("❌ Disconnected");
        setConnected(false);
      },
      onStompError: (frame) => console.error("❗ STOMP Error:", frame),
      onWebSocketError: (error) => console.error("❗ WebSocket Error:", error),
    });
  
    stompClient.activate();
    stompClientRef.current = stompClient;
  
    return () => {
      stompClient.deactivate();
    };
  }, [token]);
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!stompClientRef.current || !connected || message.trim() === "") return;

    const msgObject = {
      // senderEmail: currentUserEmail,
      senderName: currentUserName,
      content: message,
      messageType: "PUBLIC",
      
      timestamp: new Date().toISOString(),
    };

    stompClientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(msgObject),
    });

    setMessage("");
  };
  console.log("the message",message)
  console.log("the message",messages)
  return (
    <div className="h-screen flex flex-col">
    {/* Header */}
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-4 shadow-md">
      <h2 className="text-xl font-bold header" >Chatroom</h2>
    </div>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
      {messages.map((msg, index) => {
        const isCurrentUser = msg.senderEmail === currentUserEmail;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isCurrentUser ? "flex-end" : "flex-start",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                background: isCurrentUser
                  ? "linear-gradient(45deg, #ff6ec4, #7873f5)"
                  : "white",
                color: isCurrentUser ? "white" : "black",
                borderRadius: "20px",
                padding: "0.75rem 1rem",
                maxWidth: "65%",
                boxShadow: isCurrentUser ? "none" : "0px 2px 6px rgba(0,0,0,0.1)",
                textAlign: "left",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>
                {isCurrentUser ? "You" : msg.senderName || msg.senderEmail}
              </div>
              <div>{msg.content}</div>
            </div>
            <div
              
             
            >
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>

    {/* Message Input */}
    <div
      style={{
        padding: "1rem",
        borderTop: "1px solid #ddd",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
        style={{
          flex: 1,
          padding: "0.75rem 1rem",
          borderRadius: "30px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      <button
        onClick={sendMessage}
        disabled={!connected}
        style={{
          background: "linear-gradient(45deg, #ff6ec4, #7873f5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
          fill="white"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  </div>
          
  );
};

export default Chatroom;
