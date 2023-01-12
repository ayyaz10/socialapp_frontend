import React, { useEffect } from 'react';
// import GoogleLogin from '';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { Navigate, useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'; 
import logo from '../assets/logo-light.png';
import bgVideo from '../assets/bg-video.mp4';


import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  function handleCredentialResponse(response) {
    const userObject = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(userObject))
    // sending data to sanity database
    const {name, sub, picture} = userObject;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }
    client.createIfNotExists(doc) 
    .then(()=> {
      navigate('/', {replace: true})
    })
  }
  // initialize google client with client id
  // initialize button for login

  useEffect(()=> {
    // global google it's coming from the script 
    const IdConfiguration = {
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCredentialResponse,
    }
      google.accounts.id.initialize(IdConfiguration);

      google.accounts.id.renderButton(
        document.getElementById('signInButton'),
        {theme: "outline", size: "large", shape: "pill", logo_alignment: "center", text: "continue_with", width: 200, locale: "en-au"},
      )
  }, [])

  // if anything in this array changes it's going to run the useEffect again

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className="relative w-full h-full">
        <video
         src={bgVideo} 
         type="video/mp4"
         controls={false}
         muted
         autoPlay
         className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
        </div>
          <div id="signInButton" className="shadow-2xl"></div>
        </div>
      </div>
    </div>
  )
}

export default Login



{/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <GoogleLogin 
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps)=>(
                <button
                  type="button"
                  className='bg-mainColor flex justify-center items-center p-3 rounded-full cursor-pointer outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-4'/>Sign in with Google
                </button>
              )}
            />
          </GoogleOAuthProvider>; */}