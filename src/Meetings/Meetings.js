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
        getData()
        .then((a) => {
            a = a.data.getMeetingsByUserId;
            setMeetings(a);
            console.log(a);
        })
        
    }, [])

    return(

            <div className='meetingsPage'>

                <p className='meetingsPageText'> Meetings </p>

                <div className="meetingsPageMeetingsDiv">
                    <div className='meetingsPageMeetings'>
                        {meetings.map((meeting) => <MeetingBlock key={meeting.id} meeting={meeting}/>)}
                    </div>
                </div>

            </div>

    )
}

export default Meetings;