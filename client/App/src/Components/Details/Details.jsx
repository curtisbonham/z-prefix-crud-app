import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';


export default function Details() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([])

    //HANDLES SENDING USER TO THE DETAILS PAGE FOR AN ITEM
  useEffect(() => {
      fetch(`http://localhost:3001/details/item/${id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then((response) => {
        if(!response.ok){
          throw new Error('Failed to retrieve item details')
        }
        return response.json();
      })
      .then((data) => {data.map(item => setData(item));
      })
      .catch((error) => {
        console.error('Error retrieving item details:', error)
      })
    }, []);

  return (
    <>
    <div className='details-container'>
      <button className='back-btn' onClick={()=>navigate(-1)}>Back</button>
      <h2 className='details-title'>Details for {data.itemname}</h2>
      <div className='details-para'>
        <p><strong>Inventory Manager:</strong> {data.firstname} {data.lastname}</p>
        <p><strong>Item Name:</strong> {data.itemname}</p>
        <p><strong>Quantity</strong>: {data.quantity}</p>
        <p><strong>Description</strong>: {data.description}</p>
      </div>
    </div>
    </>
  )
}