import { useState, useEffect } from 'react'
import * as React from "react";
import './Profile.css'
import UserInventoryTable from '../Tables/UserInventoryTable.jsx'
import AllInventoryTable from '../Tables/AllInventoryTable.jsx'

function Profile() {

const [user, setUser] = useState(null)
const [userInventory, setUserInventory] = useState([])
const [allInventory, setAllInventory] = useState([])
const [userInventoryToggled, setUserInventoryToggled] = useState(false)
const [allInventoryToggled, setAllInventoryToggled] = useState(false)

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  setUser(storedUser);
}, []);

if(!user) {
  return <div>Loading...</div>
}

//HANDLES GETTING SPECIFIC USER INVENTORY
const getUserInventory = async () => {
    setUserInventoryToggled(!userInventoryToggled)
    const response = await fetch(`http://localhost:3001/user/${user.id}/inventory`)
      .then(res => res.json())
      .then(data => {
        if(data.length === 0){
          return <div>No inventory found for {user.firstname} {user.lastname}</div>
        } else {setUserInventory(data)}
      })
    .catch(err => {
      console.error('Error fetching user inventory:', err);
    })
  }

//HANDLES GETTING ALL INVENTORY
const getAllInventory = async () => {
  setAllInventoryToggled(!allInventoryToggled)
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

//HANDLES ADDING NEW ITEMS TO USER INVENTORY
const addNewItem = () => {
  const itemname = prompt('Enter item name:');
  const description = prompt('Enter item description:');
  const quantity = prompt('Enter item quantity:');

  if(itemname && description && quantity) {
    fetch(`http://localhost:3001/addItem/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemname,
        description,
        quantity,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log('Item added:', data);
      alert('Item added successfully');
    })
    .catch(err => {
      console.error('Error adding item:', err);
    });
  } else {
    alert('Please fill in all fields');
  }
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
        <div className='inventory-container'>
        <button className='add-btn' id='addNewItem-btn' onClick={addNewItem}>Add New Item</button>
          <button className='inventory-btn' id='userInventory-btn' onClick={getUserInventory}>
            Get {user.first_name}'s Inventory
          </button>

          {userInventoryToggled && (
            <div className='inventory'>
              {!userInventory.length > 0 ? (
                <div>No inventory found for {user.firstname} {user.lastname}</div>
              ) : (
                Array.isArray(userInventory) && userInventory.length > 0 && (
               <UserInventoryTable userInventory={userInventory} user={user}/>
                )
              )}
               </div>
              )}

          <button className='inventory-btn' id='allInventory-btn' onClick={getAllInventory}>
            Get All Inventory
          </button>
          {allInventoryToggled && (
            <div className='inventory'>
              <AllInventoryTable allInventory={allInventory} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile