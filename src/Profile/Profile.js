import React, {useState, useEffect} from 'react';

import "./Profile.css"

import { gql } from 'graphql-request';

import Avatar1Img from '../img/avatar1.jpg';

function Profile (props) {

    const [me, setMe] = useState({});
    
    let query = gql`
        query GetUserById {
            getUserById(id: ${localStorage.getItem("user_id")}) {
                id
                email
                first_name
                last_name
                birthday
                location
            }
        }
    `;

    async function getData() {
        try {
            return await fetch("https://myrna-server.herokuapp.com/", {
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

    function logout() {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000/login";
    }

    useEffect(() =>{
        getData()
            .then((b) =>{
                let a = b.data.getUserById;
                console.log(a)
                if (a.length === 0) {
                    window.location.href = "http://localhost:3000/login";
                } else {
                    setMe(a);
                    console.log(a);                    
                }
            })
    }, [])

    return(

            <div className='profilePage'>

                <p className='profilePageText'> Profile </p>

                <div className="profileDiv">

                    <div className="profile">
                        <p className="name" title={me.id}> {me.first_name} {me.last_name} </p>
                        <div className="profileInfo">
                            <img className="avatar" src={Avatar1Img}></img>
                            <div>
                                <p className="userInfo"> EMAIL: {me.email}</p>
                                <p className="userInfo"> BIRTHDAY: {me.birthday}</p>
                                <p className="userInfo"> LOCATION: {me.location}</p>             
                            </div>               
                        </div>
                        <input type="button" onClick={logout} value="Logout"></input>
                        <input type="button" value="Edit"></input>
                    </div>

                </div>

            </div>

    )
}

export default Profile;