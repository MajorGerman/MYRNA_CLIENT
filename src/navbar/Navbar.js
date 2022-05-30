import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {gql} from 'graphql-request';

import userImg from '../img/user.svg';
import homeImg from '../img/home.svg';
import mapImg from '../img/map.svg';
import meetingsImg from '../img/meetings.svg';
import latestImg from '../img/latest.svg'
import burgerImg from '../img/burger.svg'
import notifyImg from '../img/bell.svg'
import addPostImg from '../img/addpost.svg'

import NotificationBar from 'react-notification-bar';

import Login from '../Login/Login';
import Registation from '../Registration/Registration';

import "./Navbar.css";

function Navbar (props) {

    let userRoles = [];
    //const [userRoles, setUserRoles] = useState([]);
    const [hidden, setHidden] = useState("hidden");

    let query = gql`
        query GetUserById {
            getUserById(id: ${localStorage.getItem("user_id")}) {
                roles
            }
        }
    `;

    async function getData() {

        try {

            return await fetch(process.env.REACT_APP_SERVER_IP, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({"query": query})
            }).then((a) =>{
                return a.json()
            }).then((b) => {
                return b
            })

        } catch (err) {
            console.log(err)
        }       
    }

    useEffect(() => {
        getData().then((a) =>{
            try {
                a = a.data.getUserById.roles;
            } catch(e) {
                a = [];
            }
            console.log(a);
            //setUserRoles(a);
            userRoles = a;
            if (userRoles.indexOf('USER') == -1) {
                setHidden("hidden");
                console.log("DD")
            } else {
                setHidden("");
                console.log("GG")
            }
        });
    }, [])



    let notifyOnClick = () => {
        props.setNotify(true)
        props.setNotifyText("No notifications yet!");
    }

    let loginOnClick = () =>{
        getData().then((a) =>{
            try {
                a = a.data.getUserById.roles;
            } catch(e) {
                a = [];
            }
            userRoles = a;
            if (userRoles.indexOf('USER') == -1) {
                window.location.href = "http://localhost:3000/login";
            } else {
                window.location.href = "http://localhost:3000/profile"
            }
        });
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
                {/* <div>
                    <img src={latestImg}></img> <Link className="navlink" to="/allUpdates"> Latest Updates </Link>
                </div> */}
                <div className={hidden}>
                    <img src={meetingsImg}></img> <Link className="navlink" to="/meetings"> Meetings </Link>
                </div>
                <div className={hidden}>
                    <img style={{width: '16px'}} src={mapImg}></img> <Link className="navlink" to="/map"> Map </Link>
                </div>
            </div>

            <div className="navbar-right">
                <div className={hidden}>
                    <Link className="navlink" to="/addPost"> <img src={addPostImg}></img> </Link>
                </div>       
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