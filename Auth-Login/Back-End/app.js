const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.DB).then(()=>{
    console.log("Connected to DB");
})

.catch((err)=>{
    console.log(err);
})


const app = express()


app.listen(3000,()=>{
    console.log('Server is Running ');
})