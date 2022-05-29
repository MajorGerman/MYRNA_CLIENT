import React, {useState, useEffect} from 'react';
import Post from '../Post/Post';
import "./AllPosts.css"
import { gql } from 'graphql-request';

function AllPosts (props) {

    const [posts, setPosts] = useState([]);
    
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
                comments {
                    id
                    content
                    author {
                        id
                        first_name
                        last_name
                    }
                }
                likes
            }
        }
    `;

    async function getData() {

        try {

            return await fetch(process.env.REACT_APP_SERVER_IP, {
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
                a = a.data.getAllPosts;
                setPosts(a);
                console.log(a)
            })
    }, [])

    return(

            <div className='homePage'>

                <p className='homePageText'>Home</p>

                <div className="homePagePostsDiv">
                    <div className='homePagePosts'>
                        {posts.map((post) => <Post key={post.id} post={post}/>)}
                    </div>
                </div>

            </div>

    )
}

export default AllPosts