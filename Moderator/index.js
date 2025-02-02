const express = require('express'); 
const { randomBytes } = require('crypto'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const axios = require('axios')

const app = express(); 
app.use(bodyParser.json()); 
app.use(cors()); 

const comments = {}; 

// app.get('/posts/:id/comments', (req,res) => {
//     res.send(comments[req.params.id]); 
// }); 

// app.post('/posts/:id/comments', async (req,res) => {
//     const id = randomBytes(4).toString('hex'); 
//     const postId = req.params.id; 
//     const arr = comments[postId] || []; 
//     arr.push({id, content : req.body.content}); 
//     comments[postId] = arr; 
//     // console.log("comments"); 
//     // console.log(comments[postId]); 
//     console.log(postId); 
//     await axios.post('http://event-bus-srv:4005/posts/event', {
//         type : 'CommentCreated', 
//         comments : comments[postId],
//         postId : req.params.id,  
//     })
//     res.status(201).send({id, content : req.body.content})
// });

app.post('/event', async (req,res) => {
    console.log('Hello from Comment Moderator Event')
    console.log(req.body)
    const event = req.body; 
    console.log(event?.comments); 
    if(event.type === 'CommentCreated') {
        const status = event?.comments.content==='orange' ? 'rejected' : 'approved'; 
        await axios.post('http://event-bus-srv:4005/posts/event', {
            type : 'CommentModerated', 
            status : status,
            postId : event?.postId,  
            commentId : event?.comments?.id, 
        })
    }
    res.status(201).send({})
});

app.listen(4003, () => {
    console.log('Connected to port 4003')
})

//32