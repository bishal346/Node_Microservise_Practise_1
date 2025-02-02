import React, {useState, useEffect} from 'react'
import axios from 'axios'; 
export const Posts = () => {
    const [post, setPost] = useState(''); 
    const onSubmit = async() => {
        await axios.post('http://localhost:4000/posts',{
            title: post, 
        })
    }
    return (
        <div>
            <label>Post</label>
            <input onChange={(e) => setPost(e.target.value)}/>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default Posts; 