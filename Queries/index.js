const express = require('express'); 
const { randomBytes } = require('crypto'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const axios = require('axios')

const app = express(); 
app.use(bodyParser.json()); 
app.use(cors()); 

const posts = {}; 

const mainFunction = (event) => {
    if(event.type === 'PostCreated') {
        posts[event.post.id] = {id : event.post.id, title : event.post.title, comments : []}
    }
    if(event.type === 'CommentCreated') {
        if(posts[event.postId] !== undefined) {
            // console.log(event.type); 
            // console.log(posts[event.postId]); 
            posts[event.postId].comments.push(event.comments); 
        }
    }
    if(event.type === 'CommentUpdated') {
        if(posts[event.postId] !== undefined) {
            const comments = posts[event.postId].comments; 
            console.log(event.type); 
            console.log(posts[event.postId]); 
            const comment = comments.find(obj => obj.id === event?.commentId); 
            if(comment!==undefined) {
                comment.status = event?.status; 
            }
            
        }
    }
}

app.get('/event', (req,res) => {
    res.send(posts); 
}); 

app.post('/event', async (req,res) => {
    console.log('Hello from Post Event')
    const event = req.body; 
    console.log(req.body)
    // if(event.type === 'PostCreated') {
    //     posts[event.post.id] = {id : event.post.id, title : event.post.title, comments : []}
    // }
    // if(event.type === 'CommentCreated') {
    //     if(posts[event.postId] !== undefined) {
    //         // console.log(event.type); 
    //         // console.log(posts[event.postId]); 
    //         posts[event.postId].comments.push(event.comments); 
    //     }
    // }
    // if(event.type === 'CommentUpdated') {
    //     if(posts[event.postId] !== undefined) {
    //         const comments = posts[event.postId].comments; 
    //         console.log(event.type); 
    //         console.log(posts[event.postId]); 
    //         const comment = comments.find(obj => obj.id === event?.commentId); 
    //         if(comment!==undefined) {
    //             comment.status = event?.status; 
    //         }
            
    //     }
    // }
    mainFunction(event); 
    console.log('posts'); 
    console.log(posts); 
    res.status(201).send({})
});

app.listen(4002, async () => {
    console.log('Connected to port 4002')

    const events = await axios.get('http://event-bus-srv:4005/post/event').catch(error => console.log('error')); 

    for(let event of events.data) {
        mainFunction(event)
    }

    // events.data.map(obj => mainFunction(obj))

})