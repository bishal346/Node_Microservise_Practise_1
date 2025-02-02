import React, {useState, useEffect} from 'react'
import axios from 'axios'; 
import {Card, Grid2} from '@mui/material'; 
import Comments from './Comments';
import DisplayComments from './DisplayComments';
export const PostsDisplay = () => {
    const [post, setPost] = useState([]); 
    const onSubmit = async() => {
        // const arr = await axios.get('http://localhost:4000/posts'); 
        const arr = await axios.get('http://localhost:4002/event'); 
        console.log(arr); 
        setPost(arr.data); 
    }
    useEffect(() => {
        onSubmit(); 
    },[]); 
    return (
        <div>
            <Grid2 console spacing={2}>
            {Object.values(post).map(obj => {
                return (
                    <Grid2 item xs={4} key={obj.id}>
                <Card>
                    <h3>{obj?.title}</h3>
                    <Comments postId={obj.id}/>
                    <br></br>
                    <DisplayComments postId={obj.id} comments={obj?.comments}/>
                    </Card>
                    </Grid2>)
            })}
            </Grid2>
        </div>
    )
}

export default PostsDisplay; 