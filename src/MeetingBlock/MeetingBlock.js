import React, {useEffect, useState} from 'react';
import { gql } from 'graphql-request';
import {Link} from 'react-router-dom';

import './MeetingBlock.css';

import DotsImg from '../img/dots.svg'

function MeetingBlock(props) {

    const [dotsMenuStyle, setDotsMenuStyle] = useState("hidden dotsMenu")
    const [hiddenMe, setHiddenMe] = useState("hidden dotsMenuButton")
    const [hiddenSub, setHiddenSub] = useState("hidden dotsMenuButton")

    const [date, setDate] = useState(new Date());

    let query = gql`
        mutation DeleteMeeting {
            deleteMeeting(meeting_id: ${props.meeting.id}, user_id: ${localStorage.getItem("user_id")})
        }
    `;  

function meetingBlockDots() {
    if (dotsMenuStyle != "dotsMenu") {
        if (props.meeting.members[0].id == localStorage.getItem("user_id")) {
            setHiddenMe("dotsMenuButton");
        } else {
            setHiddenMe("hidden dotsMenuButton");
        }
        setDotsMenuStyle("dotsMenu");
    } else {
        setDotsMenuStyle("hidden dotsMenu");
    }
}

function deleteMeeting() {
    try {
        return fetch(process.env.REACT_APP_SERVER_IP, {
            headers: {'Content-Type': 'application/json', 'verify-token': localStorage.getItem("token")},
            method: 'POST',
            body: JSON.stringify({"query": query})
        }).then((a) =>{
            return a.json()
        }).then((b) => {
            console.log(b.data)
            if (b.data.deleteMeeting) {
                props.setDeleteId(props.meeting.id)
            }
            return b
        })
    } catch (err) {
        console.log(err)
    }         
}

function makeImportant() {
}

function goToMeeting() { 
}

useEffect(() =>{
    let b = new Date(parseInt(props.meeting.date));
    setDate(b);
}, []);


  return (

    <div className="meetingBlock" id={props.meeting.id}>
        <div className="meetingBlockTop">
            <Link to="/meeting" state={{ meetingId: props.meeting.id }} >
                <div onClick={goToMeeting()} className="meetingBlockName">
                    <p> {props.meeting.name} </p> 
                </div>
            </Link>
            <div className="meetingBlockDots">
                <p className='date'> { date.toLocaleDateString() } </p>
                <div style={{borderRight: "solid 0.1vw #E9E9E9", height: '30px'}}></div>
                <img onClick={meetingBlockDots} src={DotsImg}></img>
                <div className={dotsMenuStyle}>
                    <div className={hiddenSub}> Add to corner ⭐</div>
                    <div className={hiddenSub}> Compain 😠 </div>
                    <div onClick={makeImportant} className={hiddenMe}> Make important ❗ </div>
                    <div onClick={deleteMeeting} className={hiddenMe}> Delete 🗑️ </div>
                </div>
            </div>
        </div>
    </div>  

  );

}

export default MeetingBlock;
