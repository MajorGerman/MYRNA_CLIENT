import React, {useState} from 'react';
import "./Comment.css"

import avatar1 from '../img/avatars/avatar1.jpg';
import avatar2 from '../img/avatars/avatar2.jpg';
import avatar3 from '../img/avatars/avatar3.jpg';
import avatar4 from '../img/avatars/avatar4.jpg';
import avatar5 from '../img/avatars/avatar5.jpg';
import avatar6 from '../img/avatars/avatar6.jpg';

import {Link} from 'react-router-dom';

function Comment (props) {

    const [avatars, setAvatars] = useState([avatar1, avatar2, avatar3, avatar4, avatar5, avatar6]);

    return(
        <div className='comment' id={props.comment.id}>
            <div className="commentAuthor">
                <img src={avatars[props.comment.author.avatar]}></img>
                <Link to="/profile" state={{ userId: props.comment.author.id }} > <p> {props.comment.author.first_name} </p> <p> {props.comment.author.last_name} </p> </Link>
            </div>
            <div className="commentContent">
                <p> — {props.comment.content} </p>
            </div>
        </div>
    )
}

export default Comment