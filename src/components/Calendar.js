import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Calendar = () => {

  return (
    <div>
      <h1>Your Calendars</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Calendar;
