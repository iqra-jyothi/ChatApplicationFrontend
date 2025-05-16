import React from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ChatxLogo from "./ChatxLogo";
import {useRef,useState } from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
// import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const Navigate=useNavigate();
    const inputemail=useRef();
const inputpass=useRef();
const inputname=useRef();
const [error, setError] = useState("");
  const [message, setMessage] = useState("");
const handleSubmit=async(e)=>{
    // e.preventDefault();
    const name=inputemail.current.value;
    const password=inputpass.current.value;
    // const name=inputname.current.value;
    // inputemail.current.value="";
    // inputname.current.value="";
    // inputpass.current.value="";
    // console.log("name",email,"password ",password,"name is ",name);

    e.preventDefault();
    setError("");
    setMessage("");
    try{
        const response=await axios.post("http://localhost:9092/register",{name,password});
        setMessage("user registerd successfully .please login.");
        setTimeout(()=>{
            Navigate("/login");
        },2000);
    }
    catch(err)
    {
        console.error(err);
        if(err.response &&err.response.status===400 || err.response.status === 403)
        {
            const back=err.response.data;
            setError("email id already exist");
        }
        else{
            setError("an unexpected error occured");
        }
    };
}



return(
    <Container className="mt-5 signup">
    <Row className="justify-content-center">
        <Col md={6}>
            <div className="text-center mb-4">
                {/* <FaSpotify size={50} color="#1DB954" /> */}
                {/* <ChatxLogo></ChatxLogo> */}
                <h2>Signup </h2>
            </div>
            <Form 
            onSubmit={handleSubmit}
            >
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        // value={signup.name}
                        name="name"
                        autoFocus
                        ref={inputname}
                        // onChange={handlechange}
                        required
                    />
                </Form.Group>

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

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
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
                {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
                    <br />
                <Button  className="button " type="submit" block>
                    Sign Up
                </Button>
                <br />
                <span>
                    Aready have account ? 
                    <Link to="/login">Login</Link>
                </span>
            </Form>
            
            {/* <ToastContainer /> */}
        </Col>
    </Row>
</Container>
)
}
export default Signup;