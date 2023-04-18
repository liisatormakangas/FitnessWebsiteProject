import { Pool } from 'pg';

const pool: Pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FitnessWebSite',
    password: 'a640111',
    port: 5432,
})

export default pool;