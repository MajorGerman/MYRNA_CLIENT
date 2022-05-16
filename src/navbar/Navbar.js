import React from 'react';
import {Link} from 'react-router-dom';

import userImg from '../img/user.svg';
import homeImg from '../img/home.svg';
import mapImg from '../img/map.svg';
import meetingsImg from '../img/meetings.svg';
import latestImg from '../img/latest.svg'
import burgerImg from '../img/burger.svg'
import notifyImg from '../img/bell.svg'

import NotificationBar from 'react-notification-bar';

import Login from '../Login/Login';
import Registation from '../Registration/Registration';

import "./Navbar.css"

function Navbar (props) {

    //if (userRoles.some(userRole => userRole === ''))

    let notifyOnClick = () => {
        props.setNotify(true)
        props.setNotifyText("No notifications yet!");
    }

    let loginOnClick = () =>{
        props.setLogin(true)
    }

    return(

        <nav className="navbar">
            <div className="navbar-mobile">
                <div>
                    <img src={burgerImg}></img>
                </div>       
            </div>
            <div className="navbar-left">
                <div>
                    <img src={homeImg}></img> <Link className="navlink" to="/allPosts"> Home </Link>
                </div>
                <div>
                    <img src={latestImg}></img> <Link className="navlink" to="/allUpdates"> Latest Updates </Link>
                </div>
                <div>
                    <img src={meetingsImg}></img> <Link className="navlink" to="/meetings"> Meetings </Link>
                </div>
                <div>
                    <img style={{width: '16px'}} src={mapImg}></img> <Link className="navlink" to="/map"> Map </Link>
                </div>
            </div>

            <div className="navbar-right">
                <div onClick={notifyOnClick}>
                    <img src={notifyImg}></img>
                </div>
                <div onClick={loginOnClick}>
                    <img src={userImg}></img>
                </div>
            </div>
        </nav>

    )
}

export default Navbar