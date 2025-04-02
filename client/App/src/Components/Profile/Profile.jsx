import { useState, useEffect } from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import './Profile.css'


function Profile() {

const [user, setUser] = useState(null)

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  setUser(storedUser);
}, []);

if(!user) {
  return <div>Loading...</div>
}
  return (
    <>
      <h1> {user.firstName}'s Profile</h1>
    </>
  )
}

export default Profile