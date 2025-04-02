import React from 'react'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import './LoginSignUp.css'

const LoginSignUp = () => {
  const userRef = useRef();
  const [action, setAction] = useState("Sign Up");
  const [firstNameReg, setFirstNameReg] = useState("")
  const [lastNameReg, setLastNameReg] = useState("")
  const [userNameReg, setUserNameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")
  const [token, setToken] = useState()

  const handleSignup = async () => {
    setAction("Sign Up")
    if(!firstNameReg || !lastNameReg ||!userNameReg ||!passwordReg){
      return
    }
    const formData= {
      firstName: firstNameReg,
      lastName: lastNameReg,
      userName: userNameReg,
      password: passwordReg
    }

    try{
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if(response.ok){
        const data = await response.json();
        alert('Registration successful')
      }
    }catch(error){
      console.error('Error:', error)
    }

  };

  // const saveToken = (token) => {
  //   localStorage.setItem('token', JSON.stringify(userToken));
  // }

  // const getToken = () => {
  //   const tokenString = localStorage.getItem('token');
  //   const userToken = JSON.parse(tokenString);
  //   return userToken?.token

  // }

  const handleLogin = async (d) =>  {
    setAction("Login")

    if(!userNameReg || !passwordReg){
      return
    }

    const loginData = {userName: userNameReg, password: passwordReg}

    try{
      const response = await fetch('http://localhost:3001/login/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      if(response.ok){
        const data = await response.json();
        alert('Login successful')
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.location.href=`/profile/${data.user.userName}`;
      }else{
        const errorData = await response.json();
        alert(errorData.message || 'Login failed');
      }
    }catch(error){
      console.error('Error:', error)
      alert('An error occurred during login. Please try again later.')
    }

  };



  return (
    <>
    <div className='container' >
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === "Login"?<div></div>: <div className='input'>
          <img src='./assets/name.png'/>
          <input type='text' ref={userRef} placeholder='First Name' onChange={(e)=>{setFirstNameReg(e.target.value)}}/>
        </div>}
        {action === "Login"?<div></div>: <div className='input'>
          <img src='./assets/name.png'/>
          <input type='text' placeholder='Last Name' onChange={(e)=>{setLastNameReg(e.target.value)}}/>
        </div>}
        <div className='input'>
          <img src='./assets/username.png' />
          <input type='username' placeholder='Username' value={userNameReg} onChange={(e)=>{setUserNameReg(e.target.value)}} />
        </div>
        <div className='input'>
          <img src='./assets/password.png'/>
          <input type='password' placeholder='Password' value={passwordReg} onChange={(e)=>{setPasswordReg(e.target.value)}}/>
        </div>
      </div>
      {/* {action==="Sign Up"?<div></div>:<div className='forgot-password'>Forgot Password? <span>Click Here</span></div>} */}
      <div className='submit-container'>
        <div className={action === "Login" ? "submit gray":"submit"} onClick={()=>{handleSignup()}}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray": "submit"} onClick={()=>{ handleLogin(userNameReg, passwordReg)}}>Login</div>
      </div>
    </div>
    </>
  )

}

export default LoginSignUp;