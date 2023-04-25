import { Pool } from 'pg';
require('dotenv').config();

const pool: Pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FitnessWebSite',
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
})

export default pool;