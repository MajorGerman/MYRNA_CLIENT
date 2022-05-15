import React, {useState, useEffect} from 'react';
import Post from '../Post/Post';
import "./AllPosts.css"
import { gql } from 'graphql-request';

function AllPosts (props) {

    let posts = [];
    
    let query = gql`
        query GetAllPosts {
            getAllPosts {
                id
                header
                content
                author {
                    id
                    first_name
                    last_name
                }
            }
        }
    `;

    async function getData() {

        try {

            return await fetch("https://myrna-server.herokuapp.com/", {
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