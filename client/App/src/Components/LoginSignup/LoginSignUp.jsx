import React from 'react'
import {useState,  useRef} from 'react'
import './LoginSignUp.css'

const LoginSignUp = () => {
  const userRef = useRef();
  const [action, setAction] = useState("Sign Up");
  const [firstNameReg, setFirstNameReg] = useState("")
  const [lastNameReg, setLastNameReg] = useState("")
  const [userNameReg, setUserNameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  const handleSignup = async () => {
    setAction("Sign Up")
    if(!firstNameReg || !lastNameReg ||!userNameReg ||!passwordReg){
      return
    }
    const formData= {
      firstname: firstNameReg,
      lastname: lastNameReg,
      username: userNameReg,
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

  const handleLogin = async (d) =>  {
    setAction("Login")

    if(!userNameReg || !passwordReg){
      return
    }

    const loginData = {username: userNameReg, password: passwordReg}

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.location.href=`/profile/${data.user.id}`;
      }else{
        const errorData = await response.json();
        alert(errorData.message || 'Login failed');
      }
    }catch(error){
      console.error('Error:', error)
      alert('An error occurred during login. Please try again later.')
    }
  };

  const handleGuest = async () => {
    const loginGuest = {username : 'Guest', password: 'Guest'}
    try{
    const response = await fetch('http://localhost:3001/login/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginGuest)
    })
    if(response.ok){
      const data = await response.json();
      window.location.href='/guest';
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
    <div className='login-container' >
      <div className='header'>
        <div className='text'>{action}</div>
      </div>
      <div className='inputs'>
        {action === "Login"?<div></div>: <div className='input'>
          <input type='text' ref={userRef} placeholder='First Name...' onChange={(e)=>{setFirstNameReg(e.target.value)}}/>
        </div>}
        {action === "Login"?<div></div>: <div className='input'>
          <input type='text' placeholder='Last Name...' onChange={(e)=>{setLastNameReg(e.target.value)}}/>
        </div>}
        <div className='input'>
          <input type='username' placeholder='Username...' value={userNameReg} onChange={(e)=>{setUserNameReg(e.target.value)}} />
        </div>
        <div className='input'>
          <input type='password' placeholder='Password...' value={passwordReg} onChange={(e)=>{setPasswordReg(e.target.value)}}/>
        </div>
      </div>
      <div className='submit-container'>
        <div className={action === "Login" ? "submit gray":"submit"} onClick={()=>{handleSignup()}}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray": "submit"} onClick={()=>{ handleLogin(userNameReg, passwordReg)}}>Login</div>
        <div className="submit gray" onClick={()=>handleGuest()}>Guest</div>
      </div>
    </div>
    </>
  )

}

export default LoginSignUp;