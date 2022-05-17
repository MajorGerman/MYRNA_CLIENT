import React, {useState} from 'react';
import "./Comment.css"

import Avatar2Img from '../img/avatar2.jpg';

function Comment (props) {

    return(
        <div className='comment' id={props.comment.id}>
            <div className="commentAuthor">
                <img src={Avatar2Img}></img>
                <p> {props.comment.author.first_name} </p> 
                <p> {props.comment.author.last_name} </p>
            </div>
            <div className="commentContent">
                <p> {props.comment.content} </p>
            </div>
        </div>
    )
}

export default Comment