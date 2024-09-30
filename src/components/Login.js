import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async(e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if(response.ok){
            const data = await response.json();
            console.log('Login successful:', data);
            window.location.href = '/calendar';
        }
    };

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input 
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
            />
            <input 
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
            />
            <button type='submit'>Login</button>
            <Link to="/register">Register</Link>
        </form>
        {error && <p>{error}</p>}
    </div>
  );
};

export default Login;