import { useState, useEffect } from 'react'
import * as React from "react";
import './Profile.css'
import AllInventoryTable from '../Tables/AllInventoryTable.jsx'

function Guest() {

const [user, setUser] = useState(null)
const [allInventory, setAllInventory] = useState([])

if(!user) {
  return <div>Loading...</div>
}

//HANDLES GETTING ALL INVENTORY
const getAllInventory = async () => {
  const response = await fetch('http://localhost:3001/inventory')
  .then(res => res.json())
  .then(data => {
    if(data.length === 0){
      return <div>No inventory found</div>
    } else {
      setAllInventory(data)
    }
  })
  .catch(err => {
    console.error('Error fetching all inventory:', err);
  })
}

//HANDLES LOGOUT
const logout = () => {
  localStorage.removeItem('user');
  setUser(null);
  window.location.href = '/';
}

  return (
    <>
      <div className='profile-container'>
        <div className='header'>
          <button className='logout-btn' onClick={logout}>Logout</button>
          <h1>Welcome, {user.firstname} {user.lastname}!</h1>
        </div>
          <div className='inventory'>
            <AllInventoryTable allInventory={allInventory}  />
          </div>
        </div>
    </>
  )
}

export default Guest