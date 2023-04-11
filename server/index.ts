import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import storyRouter from './controllers/story_controller.js';
import courseRouter from './controllers/course_controller.js';
import cartRouter from './controllers/cart_controller.js';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3001;

app.use('/story', storyRouter);
app.use('/course', courseRouter);
app.use('/cart', cartRouter);

app.listen(PORT)