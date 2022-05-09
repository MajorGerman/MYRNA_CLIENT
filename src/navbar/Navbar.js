import React from 'react';
import {Link} from 'react-router-dom';

import "./Navbar.css"

function Navbar (props) {

    //if (userRoles.some(userRole => userRole === ''))

    return(

        <div className="navbar">
            <div>
                <Link className="navlink" to="/">Main</Link>
            </div>
            <div>
                <Link className="navlink" to="/allPosts">Posts</Link>
            </div>
            <div>
                <Link className="navlink" to="/">third</Link>
            </div>
            <div>
                <Link className="navlink" to="/registration">Registration</Link>
            </div>
        </div>

    )
}

export default Navbar