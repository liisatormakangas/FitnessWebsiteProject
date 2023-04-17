import { Pool } from 'pg';

const pool: Pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FitnessWebSite',
    password: '1234',
    port: 5432,
})

export default pool;