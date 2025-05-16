
import React from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ChatxLogo from "./ChatxLogo";
import {useRef,useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
const Verify=()=>{
    const inputemail=useRef();
    const inputotp=useRef();
    const navigate =useNavigate();
    const [message, setMessage] = useState("");
    const handleverify=async(e)=>{
        e.preventDefault();
        const email=inputemail.current.value;
        const otp=inputotp.current.value;
        console.log(email," ",otp);


     
            try {
                const response = await axios.post("http://localhost:9092/api/auth/verify-otp", {  email,otp });
                setMessage(response.data);
                // onVerified(email, otp);
                setTimeout(() => {
                    navigate('/reset');
                }, 2000); 
                console.log(otp);
                console.log("the error is",response.data);
            } catch (error) {
                setMessage("Invalid OTP");
            }
    }
    
    
    return (
        <Container className="mt-5 signup">
        <Row className="justify-content-center">
            <Col md={6}>
                <div className="text-center mb-4">
                    {/* <FaSpotify size={50} color="#1DB954" /> */}
                    {/* <ChatxLogo></ChatxLogo> */}
                    <h2>verify</h2>
                </div>
                <Form 
                onSubmit={handleverify}
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

                    <Form.Group controlId="formEmail">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control
                            type="number"
                            // placeholder="Enter your "
                            // value={signup.email}
                            // email="email"
                            name='otp'
                    
                            autoFocus
                            ref={inputotp}
    
                            // onChange={handlechange}
                            required
                        />
                    </Form.Group>
    
                   
                        <br />
                   <Button className="button " type="submit" block>
                        veryfy otp
                        </Button>
                    <br />
                    <span>
                        
                  
              {message}
                        {/* <Link to="/login">Login</Link> */}
                    </span>
                </Form>
                
                {/* <ToastContainer /> */}
            </Col>
        </Row>
    </Container>
    )
}
export default Verify;