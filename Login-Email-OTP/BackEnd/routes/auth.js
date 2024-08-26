const express = require('express');
const { signup, login, logout, verifyEmail } = require('../controllers/authControllers');

const routes = express.Router();

routes.post('/signup',signup)
routes.post('/login', login)
routes.post('/logout', logout)

routes.post('/verify-Email',verifyEmail)

module.exports = routes;
