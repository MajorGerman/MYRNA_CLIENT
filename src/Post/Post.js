import React, {useState} from 'react';
import Comment from '../Comment/Comment'
import { gql } from 'graphql-request';

import './Post.css';

import {Link} from 'react-router-dom';

import DotsImg from '../img/dots.svg'
import PacmanImg from '../img/pacman.svg'

import avatar1 from '../img/avatars/avatar1.jpg';
import avatar2 from '../img/avatars/avatar2.jpg';
import avatar3 from '../img/avatars/avatar3.jpg';
import avatar4 from '../img/avatars/avatar4.jpg';
import avatar5 from '../img/avatars/avatar5.jpg';
import avatar6 from '../img/avatars/avatar6.jpg';

function Post(props) {

    const [avatars, setAvatars] = useState([avatar1, avatar2, avatar3, avatar4, avatar5, avatar6]);

    const [comments, setComments] = useState(props.post.comments)

    const [content, setContent] = useState("");

    const [like, setLike] = useState(props.post.likes);
    const [likeStyle, setLikeStyle] = useState("");

    let query = gql`
        mutation AddNewComment {
            addNewComment(user_id: ${localStorage.getItem("user_id")}, post_id: ${props.post.id}, content: "${content}") {
            id
            author {
                id
                first_name
                last_name
                avatar
            }
            content
            }
        }  
    `;  

    let query2 = gql`
        mutation LikePost {
            likePost(user_id: ${localStorage.getItem("user_id")}, post_id: ${props.post.id})
        }
    `; 

    function addComment(e) {
        e.preventDefault();

        try {

            setContent(content.trim());

            if (content == null || content === "" || content.slice(0,1) === " ") return;

            return fetch(process.env.REACT_APP_SERVER_IP, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({"query": query})
            }).then((a) =>{
                return a.json()
            }).then((b) => {
                setComments([].concat(comments, b.data.addNewComment))
                console.log(comments)
                document.getElementById("commentInput").value = "";
                setContent("");
                return b
            })

        } catch (err) {
            console.log(err)
        } 

    }

    function likePost() { 

        try {

            return fetch(process.env.REACT_APP_SERVER_IP, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({"query": query2})
            }).then((a) =>{
                return a.json()
            }).then((b) => {
                if (b.data.likePost) {
                    setLike(like + 1)
                    setLikeStyle("blue");
                } else {
                    setLike(like - 1);
                    setLikeStyle("");                    
                }
            })     

        } catch (err) {
            console.log(err)
        } 

    }

  return (

    <div className="post" id={props.post.id}>
        <div className="postTop">
            <div className="postAuthor">
                <Link to="/profile" state={{ userId: props.post.author.id }} >
                <img src={avatars[props.post.author.avatar]}></img>
                <p> {props.post.author.first_name} </p> 
                <p> {props.post.author.last_name} </p>
                </Link>
            </div>
            <div className="postDots">
                <img src={DotsImg}></img>
            </div>
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
        <div className="postLike">
            <img className={likeStyle} onClick={likePost} src={PacmanImg}></img>
            <p> {like} </p>
        </div>
        <div className="postComments">
            {comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
        </div>
        <div className="postComment">
            <input id="commentInput" onChange={(e) => {setContent(e.target.value)}} className='inputcont' placeholder='Express your opinion' type="text"></input>
            <i onClick={addComment} className="fa fa-paper-plane" aria-hidden='true'></i>
        </div>
    </div>

  );
}

export default Post;
