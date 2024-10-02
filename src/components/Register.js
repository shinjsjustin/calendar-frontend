import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const registerUser = async(e) =>{
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:3001/users/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password}),
            });
            const data = await response.json();
            console.log('Register user response data: \n', data);
    
            if(response.status === 201){
                navigate("/login")
            }else if(response.status === 409){
                setError('A user with that email already exists, please try another')
            }else{
                setError('Server side error')
            }
        }catch(err){
            setError('Registration error (try catch)')
            console.error(err)
        }
    }

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
            <input 
                type="name"
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required
            />
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
            <button type='submit'>Register</button>
            <Link to="/login">Login</Link>
        </form>
        {error && <p>{error}</p>}
    </div>
  );
};

export default Register;