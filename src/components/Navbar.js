import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
    const [authorized, setAuthorized] = useState(false)
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if(token){
            setAuthorized(true)
        }
    }, []);

    return (
        <nav>
            {!authorized && <div><Link to="/login">Login</Link><Link to="/register">Register</Link></div>}
            {authorized && <Logout />}
        </nav>
    );
};

export default Navbar;