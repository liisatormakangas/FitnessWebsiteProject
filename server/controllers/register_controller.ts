/*import express from 'express';
import register from '../models/register_model.js';

const controller = express.Router();

controller.post('/', (req, res) => {
    register.registerUser(req.body).then((data: any) => {
        res.send(data);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving information.'
        });
    });
});
export default controller;*/