import React, {useState, useEffect} from 'react';
import Post from '../Post/Post';
import "./AllPosts.css"

function AllPosts (props) {

    const [posts, setPosts] = useState()

    async function getData() {

        try {

            const res = await fetch("https://myrna-server.herokuapp.com/", {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({"query": "query Query {getAllPosts {id }}"})
            })

            console.log(await res.json())
            return await res.json();

        } catch (err) {

            console.log(err)

        }       
    }

    setPosts(getData())
    
    return(
        <div>
            {posts.map((post) => <Post post={post}/>)}
        </div>
    )
}

export default AllPosts