import React from 'react';
import {Link} from 'react-router-dom';

import "./Navbar.css"

function Navbar (props) {
    //if (userRoles.some(userRole => userRole === ''))
    return(
        <div>
        <li>
                <Link to="/">main</Link>
            </li>
            <li>
                <Link to="/allPosts">second</Link>
            </li>
            <li>
                <Link to="/">third</Link>
            </li>
            <li>
                <Link to="/registration">/registration</Link>
            </li>
        </div>
    )
}

export default Navbar