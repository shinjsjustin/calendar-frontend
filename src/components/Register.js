import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const searchUser = async(e) => {
        e.preventDefault();
        let apiEndPoint = `http://localhost:3001/users/check_email/${encodeURIComponent(email)}`;

        console.log("apiEndPoint: ", apiEndPoint)

        const response = await fetch(apiEndPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const checkEmailData = await response.json();

        if(response.ok){
            if(response.status == 200){
                const registerUserResponse = await fetch('http://localhost:3001/users',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name, email, password}),
                });
                const registerUserData = await registerUserResponse.json();

                if(registerUserResponse.ok){
                    console.log('Registration Success: ', registerUserData);
                    navigate('/calendar');
                }else{
                    console.error('Error with Regristration: ', registerUserData);
                    setError('Server Side Error')
                }
            }else if(response.status == 202){
                setError('User with email exists, try logging in')
            }
        }else{
            console.error("Check Email response is NOT OKAY, \n", checkEmailData)
            setError('Server side error: checking email')
        }
    };

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={searchUser}>
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