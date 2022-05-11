import React from 'react';
import {Link} from 'react-router-dom';

import user from '../img/user.svg';
import Login from '../Login/Login';

import "./Navbar.css"

function Navbar (props) {

    //if (userRoles.some(userRole => userRole === ''))
    
    let loginOnClick = () =>{
        props.setLogin(true)
    }

    return(

        <div className="navbar">
            <div className="navbar-left">
                <div>
                    <img></img><Link className="navlink" to="/allUpdates">Latest Updates</Link>
                </div>
                <div>
                    <Link className="navlink" to="/allPosts">Posts</Link>
                </div>
                <div>
                    <Link className="navlink" to="/meetings">Meetings</Link>
                </div>
                <div>
                    <Link className="navlink" to="/map">Map</Link>
                </div>
            </div>

            <div className="navbar-right" onClick={loginOnClick}>
                <div>
                    <img src={user}></img>
                </div>
            </div>
        </div>

    )
}

export default Navbar