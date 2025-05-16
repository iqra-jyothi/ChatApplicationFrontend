import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import ProtectedRoute from './component/ProtectedRoute.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Sigin from './component/Sigin.jsx';
import Forgetpassword from './component/Forgetpassword.jsx';
// import Sigin from './component/Sigin.jsx';
import Signup from './component/Signup.jsx';
import Verify from './component/Verify.jsx';
import Home from './component/Home.jsx';
import Resetpassword from './component/Resetpassword.jsx';
import Chatroom from './component/Chatroom.jsx';
import Profile from './component/Profile.jsx';
import PrivateChat from './component/PrivateChat.jsx';
const router=createBrowserRouter([
  {
    path: "/",
    element: <App />, // App handles Splash + Outlet
    children: [
      {path:'/',element:<Signup></Signup>},
      { path: '/login', element: <Sigin /> },
      {path:'/chat',element:<PrivateChat></PrivateChat>},
      {path:'/chatroom',element:<Chatroom/>},
      { path: '/forgetpassword', element: <Forgetpassword /> },
      { path: '/verify', element: <Verify /> },
      { path: '/reset', element: <Resetpassword /> },
      { path: '/signup', element: <Signup /> },
      {path:'/profile',element:  <ProtectedRoute><Profile/></ProtectedRoute>},
      {path:'/home/:name', element: (
        <ProtectedRoute>
         { <Home />}
 
        </ProtectedRoute>
      ),}],},
    ])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <RouterProvider router={router} >
    {/* <App /> */}
    </RouterProvider>
  </StrictMode>,
)
