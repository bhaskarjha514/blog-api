const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();

const db = require('./config/db').database;
mongoose.connect(db, {useNewUrlParser:true})
        .then(()=>{
            console.log('Database connected succesfully')
        })
        .catch((err)=>{
            console.log("Unable to connect database",err)
        });

const port = process.env.PORT || 5000;

// initialize cors Middleware
app.use(cors());

// initialize bodyParser Middleware
app.use(bodyParser.json());
// app.get('*', (req,res)=>{
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });
app.get('/',(req,res)=>{
    res.send('Hello World')
});

const postRoutes = require('./routes/api/post');
app.use('/api/posts', postRoutes);

app.listen(port, ()=>{
    console.log('server Started on port', port)
});