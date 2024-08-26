const express = require('express')
const bodyparser = require('body-parser')
const authroute = require('./routes/auth')
const DataBase = require('./Db/Database')
const app = express()

require('dotenv').config()
DataBase()

app.use(bodyparser.json())
app.use('/api/auth',authroute)

app.use('/',(req,res)=>{
    res.send('Welcom to the all')
})

app.listen(process.env.PORT,()=>{
    console.log("Server is ready"); 
})