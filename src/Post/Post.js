import React, {useState} from 'react';
import Comment from '../Comment/Comment'
import { gql } from 'graphql-request';

import './Post.css';

import Avatar1Img from '../img/avatar1.jpg';

function Post(props) {

    const [comments,] = useState(props.post.comments)

    const [content, setContent] = useState("");

    let query = gql`
        mutation AddNewComment {
            addNewComment(user_id: ${1}, post_id: ${props.post.id}, content: ${document.getElementsByClassName('inputcont').value}) {
            id
            author {
                id
                first_name
                last_name
            }
            content
            }
        }  
    `; 

    function addComment(e) {
        e.preventDefault();

        try {

            return fetch("https://myrna-server.herokuapp.com/", {
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

  return (

    <div className="post" id={props.post.id}>
        <div className="postAuthor">
            <img src={Avatar1Img}></img>
            <p> {props.post.author.first_name} </p> 
            <p> {props.post.author.last_name} </p>
        </div>
        <div className="postHr">
            <hr></hr>    
        </div>
        <div className="postHeader">
            <p> {props.post.header} </p>
        </div>
        <div className="postContent">
            <p> {props.post.content} </p>
        </div>
        <div className="postHr">
            <hr></hr>    
        </div>
        <div className="postComments">
        {comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
        </div>
        <div className="postComment">
            <input className='inputcont' placeholder='Express your opinion' type="text"></input>
            <i onClick={addComment} class="fa fa-paper-plane" aria-hidden='true'></i>
        </div>
    </div>

  );
}

export default Post;
