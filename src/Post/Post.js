import React, {useState} from 'react';
import Comment from '../Comment/Comment'
function Post(props) {
    const [comments,] = useState(props.post.comments)
  return (
    <div id={props.post.id}>
        <div>
            <h2>{props.post.author}</h2>
        </div>
        <div>
            {props.post.content}
        </div>
        <div>
            {comments.map((comment) => <Comment author={comment.author} content={comment.content}/>)}
        </div>
        <div>
            <input type="text"></input>
        </div>
    </div>
  );
}

export default Post;