const express = require('express');
const { signup, login, logout } = require('../controllers/authControllers');

const routes = express.Router();

routes.post('/signup',signup)

routes.get('/login', login)

routes.get('/logout', logout)

module.exports = routes;
