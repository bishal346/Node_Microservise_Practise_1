const express = require('express'); 
const { randomBytes } = require('crypto'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const axios = require('axios')

const app = express(); 
app.use(bodyParser.json()); 
app.use(cors()); 

const comments = {}; 

const events = []; 

app.post('/posts/event', async (req,res) => {
    const event = req.body; 
    console.log(event); 
    events.push(event); 
    await axios.post('http://posts-clusterip-srv:4000/event', event); 
    await axios.post('http://comments-srv:4001/event', event); 
    await axios.post('http://query-srv:4002/event', event).catch(error => console.log('error')); 
    await axios.post('http://moderator-srv:4003/event', event); 
    res.send({}); 
});

app.get('/post/event', (req,res) => {
    res.send(events); 
})

app.listen(4005, () => {
    console.log('Connected to port 4005')
})

//32