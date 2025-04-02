import { useState, useEffect } from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import * as React from "react";
import './Profile.css'


function Profile() {

const [user, setUser] = useState(null)
const [inventory, setInventory] = useState([])
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  setUser(storedUser);
}, []);

if(!user) {
  return <div>Loading...</div>
}

const getUserInventory = async () => {
  try {
    const response = await fetch(`http://localhost:3001/user/$user.id/inventory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    if(response.ok){
      const data = await response.json();
        if(data.length === 0){
          return <div>No inventory found for this user.</div>
        } else {
          data.map(item => setInventory(item))

          const datta = React.useMemo(() => data, []);
          const columns = React.useMemo(() => [])

          // {
          //   Header: 'Item Name',
          //   accessor: 'itemName',
          // },

          // {
          //   Header: 'Quantity',
          //   accessor: 'quantity',
          // },
          // {
          //   Header: 'Item Decription',
          //   accessor: 'itemDescription',

          // },

          }
        }

      }catch(error){
        console.error('Error:', error)
      }
}
  return (
    <>
    <div className='container'>
      <h1>{user.firstName}'s Profile</h1>
        <table {...getTableProps()}>
          <thead>
             {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                    ))}
                  </tr>
                ))}
                </thead>
                <tbody></tbody>
            </table>
          </div>
    </>
  )
}

export default Profile