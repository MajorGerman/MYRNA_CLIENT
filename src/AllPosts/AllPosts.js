import React, {useState, useEffect} from 'react';
import Post from '../Post/Post';
import "./AllPosts.css"

function AllPosts (props) {

    let posts = [];

    async function getData() {

        try {

            return await fetch("https://myrna-server.herokuapp.com/", {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({"query": "query Query {getAllPosts {id, header, content}}"})
            }).then((a) =>{
                return a.json()
            }).then((b) => {
                return b
            })

        } catch (err) {

            console.log(err)

        }       
    }

    useEffect(() =>{
        getData()
        .then((a) =>{
            posts = a.data.getAllPosts;
            console.log(posts)
        })
        
    }, [])

    return(
        <div>
            {posts.map((post, key) => <Post key={key} post={post}/>)}
        </div>
    )
}

export default AllPosts