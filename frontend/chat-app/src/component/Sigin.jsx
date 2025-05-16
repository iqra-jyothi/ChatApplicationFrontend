import React from "react"
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react"
// import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ChatxLogo from "./ChatxLogo";
import {useRef,useState } from "react";
import { jwtDecode } from "jwt-decode";

const Sigin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Correct way to use useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:9092/login", {
        name,
        password,
      });

      const token = response.data;

      if (token === "false") {
        // Backend responds with "false" for invalid credentials
        setError("Invalid username or password.");
      } else {
        // Store token in localStorage (or other secure storage)
        // localStorage.setItem("token", token);
        localStorage.setItem("token", response.data);
        console.log("the login token",localStorage.getItem("token"))
        console.log(jwtDecode(localStorage.getItem("token")));
        setMessage("Login successful!");

        // After successful login, navigate to the /search route
        setTimeout(()=>{
          navigate("/profile");
      },2000);
        // navigate('/profile');
        console.log("Navigating to profile");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
   
    <Container className="mt-5 signup">
            <Row className="justify-content-center">
                 <Col md={6}>
                   <div className="text-center mb-4">
                       {/* <FaSpotify size={50} color="#1DB954" /> */}
                        {/* <ChatxLogo></ChatxLogo> */}
                         <h2>Sigin </h2>
                     </div>
                     <Form 
                     onSubmit={handleSubmit}
                     >

                        <Form.Group >
                         <Form.Label>Email address</Form.Label>
                     <Form.Control
                            type="email"
                            placeholder="Enter your email"
                          //  id="name"
                            value={name}
                            
                            onChange={(e)=>setName(e.target.value)}
                            required
                        />
                    </Form.Group>
        
        {/* <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}




                        <Form.Group >
                         <Form.Label>Password</Form.Label>
                         <Form.Control
                            type="password"
                            placeholder="Password"
                          id="password"
                           
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                   {message && <p style={{ color: "green" }}>{message}</p>}
                         <br />
                         <Link to="/forgetpassword"><p>forget password</p></Link>
                     <Button  className="button " type="submit" block>
                         Signin
                     </Button>
                     <br />
                     <span>
                         dont  have an account ? <Link to="/signup">Signup</Link>
                         {/* <Link to="/login">Login</Link> */}
                     </span>
                 </Form>
                
                 {/* <ToastContainer /> */}
             </Col>
         </Row>
     </Container>
  );
};

export default Sigin;