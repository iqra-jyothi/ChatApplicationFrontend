import React from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ChatxLogo from "./ChatxLogo";
import {useRef,useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const  Resetpassword=()=>{

    const inputemail=useRef();
    const inputpass=useRef();
    const inputotp=useRef();
    const[message,setMessage]=useState();
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const email=inputemail.current.value;
        const password=inputpass.current.value;
        const otp=inputotp.current.value;
        inputemail.current.value="";
        inputotp.current.value="";
        inputpass.current.value="";
        console.log("name",email,"password ",password,"the otp is ",otp);
        try{
            const response =await axios.post("http://localhost:9092/api/auth/reset-password",{email, otp:otp, newPassword: password })
            console.log(response.data);
            setMessage(response.data);
            setTimeout(()=>{
                navigate("/login");
            },2000)

            

        }
        catch{
            console.log("error");
            setMessage("some thing invalid");
        }
    }
    return (
        <Container className="mt-5 signup">
        <Row className="justify-content-center">
            <Col md={6}>
                <div className="text-center mb-4">
                    {/* <FaSpotify size={50} color="#1DB954" /> */}
                    {/* <ChatxLogo></ChatxLogo> */}
                    <h2>reset password </h2>
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


                    <Form.Group controlId="formEmail">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control
                            // type="number"
                            // placeholder="Enter your "
                            // value={signup.email}
                            // email="email"
                            // name='otp'
                    
                            autoFocus
                            ref={inputotp}
    
                            // onChange={handlechange}
                            required
                        />
                    </Form.Group>
    
                    <Form.Group controlId="formPassword">
                        <Form.Label> new Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            // value={signup.password}
                            // password="password"
                            name='password'
                            autoFocus
                            ref={inputpass}
                            // onChange={handlechange}
                            required
                        />
                    </Form.Group>
                        <br />
                  <Button  className="button " type="submit" block>
                        reset
                    </Button>
                    <br />
                    <span>
                        message
                        {/* <Link to="/login">Login</Link> */}
                    </span>
                </Form>
                
                {/* <ToastContainer /> */}
            </Col>
        </Row>
    </Container>
    )
}
export default Resetpassword