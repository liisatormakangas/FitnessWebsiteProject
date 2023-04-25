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

//here is old code, for reference in cse mess up
/* controller.post('/add/:course_id', (req, res) => {
    cart.addCourse(parseInt(req.params.course_id)).then((data: any) => {
        res.send(data.rows[0]);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while adding course to cart.'
        });
    });
}); */
controller.post('/add-to-cart', (req, res) => {
    const { userId, courseId } = req.body;
    cart.addCourse(userId, courseId).then((data: any) => {
      res.send(data.rows[0]);
    }).catch((error: any) => {
      res.status(500).send({
        message: 'Some error occurred while adding course to cart.'
      });
    });
  });
  
export default controller;