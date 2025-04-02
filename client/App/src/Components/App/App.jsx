import { useState, useEffect } from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import './App.css'
import LoginSignUp from '../LoginSignup/LoginSignUp.jsx'
import UserInventory from '../UserInventory/UserInventory.jsx'
import AllInventory from '../AllInventory/AllInventory.jsx'
import Profile from '../Profile/Profile.jsx'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LoginSignUp />}/>
        <Route path='/userinventory' element={<UserInventory />} />
        <Route path='/allinventory' element={<AllInventory />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
