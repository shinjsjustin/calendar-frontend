import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './navbar_components/Logout';

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
            {!authorized && 
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            }
            {authorized && 
                <div>

                    <Logout />
                </div>
            }
        </nav>
    );
};

export default Navbar;