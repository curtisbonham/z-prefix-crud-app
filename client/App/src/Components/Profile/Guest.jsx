import React, { useState, useEffect } from 'react'
import './Guest.css'
import AllInventoryTable from '../Tables/AllInventoryTable.jsx'

export default function Guest() {

const [allInventory, setAllInventory] = useState([])

//HANDLES GETTING ALL INVENTORY
useEffect (() => {
  fetch('http://localhost:3001/inventory')
    .then(res => {
      if(!res.ok){
        throw new Error('Failed to fetch inventory');
      }
      return res.json();
    })
    .then((data) => {
      if(data.length === 0){
        return <div>No inventory found</div>
      } else {
        setAllInventory(data);
      }
    })
    .catch((error) => {
      console.error('Error fetching all inventory:', error);
    });
}, []);

//HANDLES LOGOUT
const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/';
}

  return (
    <>
      <div className='guest-container'>
        <div className='header'>
          <button className='logout-btn' onClick={logout}>Logout</button>
          <h1>Welcome, Guest User!</h1>
        </div>
          <div className='inventory'>
            <AllInventoryTable allInventory={allInventory}  />
          </div>
        </div>
    </>
  )
}
