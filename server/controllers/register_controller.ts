import express from 'express';
import register from '../models/register_model.js';

const controller = express.Router();

controller.post('/registerUser', (req, res) => {
    register.registerUser(req.body).then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.'
        });
    });
});
export default controller;