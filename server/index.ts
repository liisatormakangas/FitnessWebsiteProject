import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Pool, QueryResult } from 'pg';

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3001;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello everyone!');
})

app.listen(PORT)