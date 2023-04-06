import { Pool } from 'pg';

const pool: Pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FitnessWebSite',
    password: "rasilar",
    port: 5432,
})

export default pool;