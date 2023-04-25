import pool from '../db.js'

const cart = {
    getCart: async () => {
        const result = await pool.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [1]);
        return result;
    },
    //old code save here
/*     addCourse: async (course_id: number) => {
        const result = await pool.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [1, course_id]);
        return result;
    }, */
    //new code, to add a course to the cart
        addCourse: async (course_id: number, user_id: number) => {
        const result = await pool.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [user_id, course_id]);
        return result;
},
};

//add get cart by user id
getCart: async (userId: number) => {
    const result = await pool.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course INNER JOIN users ON cart.id_user = users.id_user WHERE cart.id_user = $1', [userId]);
    return result;
  }
  


export default cart;