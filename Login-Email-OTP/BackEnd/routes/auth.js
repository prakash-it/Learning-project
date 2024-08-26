const express = require('express');
const { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } = require('../controllers/authControllers');
const verifyToken = require('../middlerware/verifyToken.js');


const routes = express.Router();

routes.get("/check-auth", verifyToken, checkAuth);

routes.post('/signup', signup);
routes.post('/login', login);
routes.post('/logout', logout);

routes.post('/verify-email', verifyEmail);
routes.post('/forgot-password', forgotPassword);
routes.post('/reset-password/:token', resetPassword);

module.exports = routes;
