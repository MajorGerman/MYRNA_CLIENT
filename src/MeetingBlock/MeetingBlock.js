import React, {useState} from 'react';
import { gql } from 'graphql-request';

import './MeetingBlock.css';

import DotsImg from '../img/dots.svg'

function MeetingBlock(props) {

    let query = gql`
    `;  

  return (

    <div className="meetingBlock" id={props.meeting.id}>
        <div className="meetingBlockTop">
            <div className="meetingBlockName">
                <p> {props.meeting.name} </p> 
            </div>
            <div className="meetingBlockDots">
                <img src={DotsImg}></img>
            </div>
        </div>
    </div>

  );

}

export default MeetingBlock;
