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

const openDb = (): Pool => {
    const pool: Pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'FitnessWebSite',
        password: "rasilar",
        port: 5432,
    })
    return pool;
}

app.listen(PORT)