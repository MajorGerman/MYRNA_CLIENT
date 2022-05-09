import React, {useState} from 'react';
import Post from '../Post/Post';
import "./AllPosts.css"


function AllPosts (props) {

    const [posts, ] = useState()
    
    async function loadPosts(offset, take){
        try{
        const res = await fetch("https://myrna-server.herokuapp.com/", {
            header: 'content-type: application/json',
            method: 'POST',
            //body: JSON.stringify({query: 'Query {getAllUsers {id roles }}'})
        })
        console.log(res)
        } catch (err){
            console.log(err)
        }
        //console.log(res)
        
    }


    //loadPosts();
    
    loadPosts()
    return(
        <div>
            {posts.map((post) => <Post post={post}/>)}
        </div>
    )
}

export default AllPosts
