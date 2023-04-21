import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//need to create a new model for the user
import User from '../models/user_model';
import Course from '../models/course_model';

const router = express.Router();

router.post('/addtocart/:courseId', async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      // Extract JWT token from header
      if (!token) {
        return res.status(401).send({ message: 'No token provided!' });
      }
  
      // Verify the token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
  
      // Get the course id from the URL
      const courseId = req.params.courseId;
  
      // Check if user is logged in
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        return res.status(401).send({
          message: 'Please log in to enroll course',
        });
      }
  
      // Check if course exists in database
      const course = await Course.findByPk(decoded.courseId);
      if (!course) {
        return res.status(404).send({
          message: 'The course does not exist',
        });
      }
      const cartItem = await CartItem.findOne({
        where: { userId: decoded.userId, courseId },
      });


      // Check if course already exists in user's cart
      if (user.cart.some((item: any) => item.courseId === courseId)) {
        return res.status(400).send({
          message: 'Course already added to cart',
        });
      }
  
      // Add course to user's cart
      user.cart.push({ courseId });
      await user.save();
  
      res.status(200).send({
        message: 'Course added to cart',
      });
    } catch (error) {
      /* console.error(error); */
      return res.status(500).send({
        message: 'Something went wrong',
      });
    }
  });
  

export default router;