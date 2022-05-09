import React, {useState} from 'react';
import "./Comment.css"

function Comment (props) {
    async function loadPosts(offset, take){
        const response = await fetch("https://myrna-server.herokuapp.com/",{
            method: 'POST',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify({query:`{getAllPosts}`})
        })
        const responseBody = await response.json();
        return responseBody.data
    }

    const [posts, ] = useState(loadPosts)

    return(
        <div>
            {posts.map()}
        </div>
    )
}

export default Comment