import express from 'express';
import cart from '../models/cart_model.js';

const controller = express.Router();

//old code fot 4/26 before find out couse id and uset id use wrong

controller.get('/:id', (req, res) => {
  //to get user id
  // const userId = req.body.id_user;
  
  // console.log(req.body.id_user);
  // console.log(req.body);
  const userId = parseInt(req.params.id);
  cart.getCart(userId).then((data: any) => {
    res.send(data.rows);
  }).catch((error: any) => {
    res.status(500).send({
      message: 'Some error occurred while retrieving cart.'
    });
  });
});

controller.post('/add-to-cart', (req, res) => {
  //new code, to get user id and course id 4/26 new code
  const userId = req.body.userId;
  const courseId = req.body.courseId;

  //4/26 new code change the order of userId and courseId
  cart.addCourse(userId, courseId).then((data: any) => {
    res.send(data.rows[0]);
  }).catch((error: any) => {
    res.status(500).send({
      message: 'Some error occurred while adding course to cart.'
    });
  });
});

//remove course from cart 4/30
controller.post('/remove-from-cart', async(req, res) => {
  const userId = req.body.userId;
  const courseId = req.body.courseId;
  try{
    await cart.removeCourse( courseId, userId);
    res.status(200).send({
      message: 'Course has been removed from cart!'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Some error occurred while removing course from cart.'    
  });
  }
});
export default controller;