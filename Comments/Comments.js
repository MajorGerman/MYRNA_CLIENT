import React, {useState} from 'react';
import Comment from '../Comment/Comment'
function Comments(props) {
    const [comments, setComments] = useState(props.Comments.comments)
  return (
    <div>
        <div>
            {comments.map((comment) => <Comment author={comment.author} content={comment.content}/>)}
        </div>
        <form>
            <input type="text"></input>
            <input type="submit" value="Submit" />
        </form>
    </div>
  );
}

export default Comments;