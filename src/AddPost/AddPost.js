import React, {useState, useEffect} from 'react';
import { gql } from 'graphql-request';
import './AddPost.css';

function AddPost (props) {

    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");

    let query = gql`
        mutation AddNewPost {
            addNewPost(user_id: ${localStorage.getItem("user_id")}, 
                header: "${header}", 
                content: "${content}") {
                id
            }
        }    
    `; 

    async function addPost(e) {

        e.preventDefault();

        try {

            return await fetch(process.env.REACT_APP_SERVER_IP, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({"query": query})
            }).then((a) =>{
                return a.json()
            }).then((b) => {
                window.location.href = "http://localhost:3000/allPosts";
                return b
            })

        } catch (err) {

            console.log(err)

        }   
    }
   
    return(

        <div className='addPostPage'>

            <div className='addPost'>

                <p className='addPostText'> Add Post </p> 

                    <form method="POST" onSubmit={addPost}>

                        <div className='addPostForm'>

                            <div className='addPostFormText'>
                                <textarea onChange={(e) => {setHeader(e.target.value); console.log(e.target.value)}} onKeyDown={(e) => {if(e.keyCode === 13) { e.preventDefault();} }} maxLength="50" placeholder="My last dinner" name="header"></textarea>
                                <textarea onChange={(e) => {setContent(e.target.value)}} maxLength="800" placeholder="This pie was so finger lickin' good..." name="content"></textarea>    
                            </div>
                            
                            <div className='addPostFormSubmit'>
                                <input type="submit" value=" Here we go "></input>
                            </div>

                        </div>

                    </form>

            </div>

        </div>
    )
}

export default AddPost