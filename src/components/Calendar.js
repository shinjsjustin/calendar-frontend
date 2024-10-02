import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import Navbar from './Navbar';

const Calendar = () => {
  const [error, setError] = useState('');

  const fetchCalendarData = async () =>{
    setError('')
    const token = localStorage.getItem('token');

    if(token){
      const decoded = jwtDecode(token);
      console.log('Decoded token: ', decoded);

      const email = decoded.email;
      const id = decoded.id;
      try{
        const response = await fetch(`http://localhost:3001/calendars/${encodeURIComponent(id)}`,{
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log('Calendar request data: ', data);

        if(response.status === 200){
          setError(`name: ${data[0].name}, description: ${data[0].description}`)
        }else if(response.status === 404){
          setError('No Calendars found')
        }
      }catch(err){
        setError('Calendar fetching error')
        console.error(err)
      }
    }else{
      setError('No Token');
    }
  }

  return (
    <div>
      <Navbar/>
      <h1>Your Calendars</h1>
      <button onClick={fetchCalendarData}>Refresh Me!</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Calendar;
