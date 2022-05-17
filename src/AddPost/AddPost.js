import React, {useState, useEffect} from 'react';
import { gql } from 'graphql-request';
import './AddPost.css';

function AddPost (props) {

    let query = gql`
    
    
    
    
    
    
    
    
    `; 
   
    return(

        <div className='addPostPage'>

            <div className='addPost'>

                <p className='addPostText'> Add Post </p> 

                    <form method="POST">

                    <div className='addPostForm'>

                        <div className='addPostFormText'>
                            <input type="text" placeholder="My last dinner" name="header"></input>
                            <input type="text" placeholder="This pie was so finger lickin' good..." name="content"></input>    
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