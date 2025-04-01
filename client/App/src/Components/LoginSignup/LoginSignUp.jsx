import React from 'react'
import {useState, useEffect} from 'react'
import './LoginSignUp.css'

const LoginSignUp = () => {

  const [action, setAction] = useState("Sign Up");
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === "Login"?<div></div>: <div className='input'>
          <img src='./assets/name.png'/>
          <input type='text' placeholder='Name'/>
        </div>}
        <div className='input'>
          <img src='./assets/username.png' />
          <input type='username' placeholder='Username' />
        </div>
        <div className='input'>
          <img src='./assets/password.png'/>
          <input type='password' placeholder='Password'/>
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className='forgot-password'>Forgot Password? <span>Click Here</span></div>}
      <div className='submit-container'>
        <div className={action === "Login" ? "submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray": "submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>
    </>
  )

}

export default LoginSignUp;