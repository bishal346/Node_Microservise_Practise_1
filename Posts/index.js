const express = require('express'); 
const { randomBytes } = require('crypto'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const axios = require('axios')

const app = express(); 
app.use(bodyParser.json()); 
app.use(cors()); 

const posts = {}; 

app.get('/posts', (req,res) => {
    res.send(posts); 
}); 

app.post('/posts', async (req,res) => {
    const id = randomBytes(4).toString('hex'); 
    posts[id] = {
        id, title : req.body.title
    }
    console.log("posts"); 
    console.log(posts[id]); 
    await axios.post('http://event-bus-srv:4005/posts/event', {
        type : 'PostCreated', 
        post : posts[id],
    }).catch(error => console.log('error')); 
    res.status(201).send(posts[id])
});

app.post('/event', (req,res) => {
    console.log('Hello from Post Event')
    console.log(req.body)
    res.status(201).send({})
});

app.listen(4000, () => {
    console.log('Connected to port 4000'); 
    console.log('v85'); 
    console.log('hello'); 
})