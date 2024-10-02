import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import Calendar from './components/Calendar';
import Register from './components/Register';
import NoPage from './components/NoPage';
import Home from './components/Home';
import ProtectedRoute from './config/ProtectedRoute';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <Calendar/>
          </ProtectedRoute>
        } />
        <Route path="/*" element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
