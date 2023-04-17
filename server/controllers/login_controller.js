"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register_model_js_1 = __importDefault(require("../models/register_model.js"));
const controller = express_1.default.Router();
controller.post('/', (req, res) => {
    const { username, password } = req.body;
    // Call loginUser function from the model
    register_model_js_1.default.loginUser(username, password)
        .then((user) => {
        // If login successful, you can generate a JWT and send it back to the client
        const token = jsonwebtoken_1.default.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    })
        .catch((error) => {
        // If login fails, return an error response
        res.status(401).json({ error: error.message });
    });
});
exports.default = controller;
