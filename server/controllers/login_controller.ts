// Import dependencies
import express from 'express';
import jwt from 'jsonwebtoken';
import loginUser from '../models/login_model';
import { config } from 'dotenv';

require('dotenv').config();

const secretKey = process.env.SECRET_KEY as string;


const controller = express.Router();

controller.post('/', (req, res) => {
  const { username, password } = req.body;
 
  // Call loginUser function from the model
  loginUser(username, password)
    .then((user) => {
      // If login successful, you can generate a JWT and send it back to the client
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token, username: user.username });
      
    })
    .catch((error) => {
      // If login fails, return an error response
      res.status(401).json({ message: 'invalid username or password' });
    });
});
controller.post('/logout', (req, res) => {
    // You can clear the user's JWT token from the client-side by removing the token from the browser's local storage
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  });

export default controller;