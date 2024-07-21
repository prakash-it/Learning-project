const express = require('express');
const mongoose = require('mongoose');
const user = require('./router/user');
const auth = require('./router/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send("HI auth");
});

app.use('/user', user);
app.use('/auth', auth);

app.use((err, req, res, next) => {
    const statusCode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

app.listen(3300, () => {
    console.log('Server is Running');
});
