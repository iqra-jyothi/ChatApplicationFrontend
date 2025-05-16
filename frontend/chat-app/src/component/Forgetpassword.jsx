import React from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ChatxLogo from "./ChatxLogo";
import {useRef,useState } from "react";
// import {Link} from 'react-router-dom';
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Forgetpassword=()=>{
    const inputemail=useRef();
    const [message,setMessage]=useState("");
    const navigate = useNavigate(); 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const email=inputemail.current.value;
        console.log(email);
        try {
            const response = await axios.post("http://localhost:9092/api/auth/forgot-password", { email });
            setMessage("OTP sent successfully!");  // set a clear success message
            setTimeout(() => {
                navigate('/verify');
            }, 2000); 
        }
        catch (error) {
            console.error("Error during OTP request:", error);
            
            // Check if there's a response from backend
            if (error.response && error.response.data) {
                setMessage(`Error: ${error.response.data}`);
            } else {
                setMessage("An unexpected error occurred.");
            }
        }
    



    }
    return (
        <Container className="mt-5 signup">
    <Row className="justify-content-center">
        <Col md={6}>
            <div className="text-center mb-4">
                {/* <FaSpotify size={50} color="#1DB954" /> */}
                {/* <ChatxLogo></ChatxLogo> */}
                <h2>ForgetPassword </h2>
            </div>
            <Form 
            onSubmit={handleSubmit}
            >
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        // value={signup.email}
                        // email="email"
                        name='email'
                
                        autoFocus
                        ref={inputemail}

                        // onChange={handlechange}
                        required
                    />
                </Form.Group>

               
                    <br />
            
               <Button  className="button "  type="submit" block>
                    get otp
                </Button>
                <br />
           
                {message && (
    <p style={{ 
        color: message.startsWith("Error:") ? "red" : "green",
        marginTop: "1rem",
        fontWeight: "bold"
    }}>
        {message}
    </p>
)}
            </Form>
            
            {/* <ToastContainer /> */}
        </Col>
    </Row>
</Container>
    )
}
export default Forgetpassword;