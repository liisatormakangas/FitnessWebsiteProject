import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Course, CartItem } from './models';
import { Op } from 'sequelize';

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

// Register a new user
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET);

    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

// Log in an existing user
app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user with this email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

// Add a course to the user's cart
app.post('/api/cart/add/:id', async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.id, 10);

    // Check if user is logged in
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    // Verify the JWT token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Find the user by id
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // Check if course already exists in the user's cart
    const existingCartItem = await CartItem.findOne({
      where: { userId: decoded.userId, courseId },
    });
    if (existingCartItem) {
      return res.status(400).send({ message: 'Course already in cart' });
    }

    // Add the course to the user's cart
    //await CartItem.create({});
