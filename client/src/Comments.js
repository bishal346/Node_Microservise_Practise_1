import React, {useState, useEffect} from 'react'
import axios from 'axios'; 
export const Comments = ({postId}) => {
    const [comment, setComment] = useState(''); 
    const onSubmit = async() => {
        await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
            content: comment, 
        })
    }
    return (
        <div>
            <label>Add Comment</label>
            <input onChange={(e) => setComment(e.target.value)}/>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default Comments; 