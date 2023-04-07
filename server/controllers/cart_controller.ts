import express from 'express';
import cart from '../models/cart_model.js';

const controller = express.Router();

controller.get('/', (req, res) => {
    cart.getCart().then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving cart.'
        });
    });
});

controller.post('/add/:course_id', (req, res) => {
    cart.addCourse(parseInt(req.params.course_id)).then((data: any) => {
        res.send(data.rows[0]);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while adding course to cart.'
        });
    });
});

export default controller;