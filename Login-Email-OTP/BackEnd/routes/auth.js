const express = require('express');
const { signup, login, logout, verifyEmail, forgotPassword, resetPassword } = require('../controllers/authControllers');

const routes = express.Router();

routes.post('/signup',signup)
routes.post('/login', login)
routes.post('/logout', logout)

routes.post('/verify-Email',verifyEmail)
routes.post('/forgot-password', forgotPassword)
routes.post('/reset-password/:token', resetPassword)


module.exports = routes;
