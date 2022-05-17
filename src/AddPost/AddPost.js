import React, {useState, useEffect} from 'react';
import { gql } from 'graphql-request';
import './AddPost.css';

function AddPost (props) {

    let query = gql`

    `; 

    function addPost(e) {
        e.preventDefault();

    }
   
    return(

        <div className='addPostPage'>

            <div className='addPost'>

                <p className='addPostText'> Add Post </p> 

                    <form method="POST" onSubmit={addPost}>

                        <div className='addPostForm'>

                            <div className='addPostFormText'>
                                <textarea onKeyDown={(e) => {if(e.keyCode == 13) { e.preventDefault(); }}} maxlength="50" placeholder="My last dinner" name="header"></textarea>
                                <textarea onKeyDown={(e) => {if(e.keyCode == 13) { e.preventDefault(); }}} maxlength="800" placeholder="This pie was so finger lickin' good..." name="content"></textarea>    
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