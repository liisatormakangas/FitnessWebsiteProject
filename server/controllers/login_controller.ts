// Import dependencies
import express from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/register_model.js';

const controller = express.Router();

controller.post('/', (req, res) => {
  const { username, password } = req.body;

  // Call loginUser function from the model
  user.loginUser(username, password)
    .then((user) => {
      // If login successful, you can generate a JWT and send it back to the client
      const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    })
    .catch((error) => {
      // If login fails, return an error response
      res.status(401).json({ error: error.message });
    });
});

export default controller;