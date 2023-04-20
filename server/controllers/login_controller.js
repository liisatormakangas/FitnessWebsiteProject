"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_model_1 = __importDefault(require("../models/login_model"));
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const controller = express_1.default.Router();
controller.post('/', (req, res) => {
    const { username, password } = req.body;
    // Call loginUser function from the model
    (0, login_model_1.default)(username, password)
        .then((user) => {
        // If login successful, you can generate a JWT and send it back to the client
        const token = jsonwebtoken_1.default.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
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
exports.default = controller;
