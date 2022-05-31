import React, {useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom'

import "./Profile.css"

import { gql } from 'graphql-request';

import Avatar1Img from '../img/avatars/avatar1.jpg';

import avatar1 from '../img/avatars/avatar1.jpg';
import avatar2 from '../img/avatars/avatar2.jpg';
import avatar3 from '../img/avatars/avatar3.jpg';
import avatar4 from '../img/avatars/avatar4.jpg';
import avatar5 from '../img/avatars/avatar5.jpg';
import avatar6 from '../img/avatars/avatar6.jpg';

function Profile (props) {

    const [avatars, setAvatars] = useState([avatar1, avatar2, avatar3, avatar4, avatar5, avatar6]);

    const [user, setUser] = useState({});
    const [birthday, setBirthday] = useState(new Date());

    const location = useLocation();

    let a = new Date();
    a.toISOString();

    const [state, setState] = useState(location.state || {userId: localStorage.getItem("user_id")});

    const [hiddenMe, setHiddenMe] = useState("");
    const [hiddenSub, setHiddenSub] = useState("hidden");

    let query = gql`
        query GetUserById {
            getUserById(id: ${state.userId}) {
                id
                first_name
                last_name
                birthday
                location
                avatar
            }
        }
    `;

    async function getData() {
        try {
            return await fetch(process.env.REACT_APP_SERVER_IP, {
                headers: {'Content-Type': 'application/json', 'verify-token': localStorage.getItem("token")},
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

    function logout() {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000/login";
    }

    useEffect(() =>{
        window.history.replaceState({}, document.title);
        getData()
            .then((b) => {
                let a = b.data.getUserById;
                if (a.length === 0) {
                    window.location.href = "http://localhost:3000/login";
                } else {
                    setUser(a);
                    if (a.id == localStorage.getItem("user_id")) {
                        setHiddenMe("");
                        setHiddenSub("hidden");
                    } else {
                        setHiddenMe("hidden");
                        setHiddenSub("me");                        
                    }
                    let b = new Date(parseInt(a.birthday));
                    setBirthday(b);
                }
            })
    }, [])

    function subsribe() {

    }

    function editProfile() {

    }

    return(

            <div className='profilePage'>

                <p className='profilePageText'> Profile </p>

                <div className="profileDiv">

                    <div className="profile">
                        <p className="name" title={user.id}> {user.first_name} {user.last_name} </p>
                        <div className="profileInfo">
                            <img className="avatar" src={avatars[user.avatar]}></img>
                            <div>
                                <p className="userInfo"> BIRTHDAY: { birthday.toLocaleDateString() }</p>
                                <p className="userInfo"> LOCATION: { user.location }</p>             
                            </div>               
                        </div>
                        <input className={hiddenMe} type="button" onClick={logout} value="Logout"></input>
                        <input className={hiddenMe} type="button" onClick={editProfile} value="Edit"></input>
                        <input className={hiddenSub} type="button" onClick={subsribe} value="Subsribe"></input>
                    </div>

                </div>

            </div>

    )
}

export default Profile;