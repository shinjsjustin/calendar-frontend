import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            console.log('Login request data: ', data);
    
            if(response.status === 200){
                localStorage.setItem('token', data.token);
                navigate('/calendar');
            }else if(response.status === 404){
                setError('No users found with that email.  Register?')
            }else if(response.status === 404){
                setError('Invalid Password')
            }else{
                setError('Server side error')
            }
        }catch(err){
            setError('An error has occured during login');
            console.error(err)
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