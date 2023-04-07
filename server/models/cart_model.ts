import pool from '../db.js'

const cart = {
    getCart: async () => {
        const result = await pool.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [1]);
        return result;
    },
    addCourse: async (course_id: number) => {
        const result = await pool.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [1, course_id]);
        return result;
    },
}

export default cart;