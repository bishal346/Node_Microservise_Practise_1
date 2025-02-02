const express = require('express'); 
const { randomBytes } = require('crypto'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const axios = require('axios')

const app = express(); 
app.use(bodyParser.json()); 
app.use(cors()); 

const comments = {}; 

app.get('/posts/:id/comments', (req,res) => {
    res.send(comments[req.params.id]); 
}); 

app.post('/posts/:id/comments', async (req,res) => {
    const id = randomBytes(4).toString('hex'); 
    const postId = req.params.id; 
    const arr = comments[postId] || []; 
    arr.push({id, content : req.body.content, status : 'evaluating'}); 
    comments[postId] = arr; 
    // console.log("comments"); 
    // console.log(comments[postId]); 
    console.log(postId); 
    await axios.post('http://event-bus-srv:4005/posts/event', {
        type : 'CommentCreated', 
        comments : {id, content : req.body.content, status : 'evaluating'},
        postId : req.params.id,  
    })
    res.status(201).send({id, content : req.body.content})
});

app.post('/event', async (req,res) => {
    console.log('Hello from Comment Event')
    console.log(req.body); 
    const event = req.body; 
    if(event.type === 'CommentModerated') {
        const comment = comments[event?.postId].find(obj => obj.id === event?.commentId); 
        console.log('comment'); 
        console.log(comment); 
        comment.status = event?.status; 
        console.log(comment); 
        await axios.post('http://event-bus-srv:4005/posts/event', {
            type : 'CommentUpdated', 
            status: event?.status,
            postId: event?.postId,
            commentId: event?.commentId, 
        })
    }
    res.status(201).send({})
});

app.listen(4001, () => {
    console.log('Connected to port 4001')
})

//32