import React, {useState, useEffect} from 'react';
import MeetingBlock from '../MeetingBlock/MeetingBlock';
import "./Meetings.css"

import { gql } from 'graphql-request';

function Meetings (props) {

    const [meetings, setMeetings] = useState([]);
    
    let query = gql`
        // getMeetingsByUserId
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

    useEffect(() =>{
        getData()
        .then((a) =>{
            setMeetings(a.data.getMeetingsByUserId);
            a = a.data.getMeetingsByUserId;
            console.log(a)
        })
        
    }, [])

    return(

            <div className='homePage'>

                <p className='homePageText'>Home</p>

                <div className="homePagePostsDiv">
                    <div className='homePagePosts'>
                        {meetings.map((meeting) => <MeetingBlock key={meeting.id} meeting={meeting}/>)}
                    </div>
                </div>

            </div>

    )
}

export default Meetings;