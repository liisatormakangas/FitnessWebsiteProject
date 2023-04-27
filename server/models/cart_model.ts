import pool from '../db.js'

const cart = {
    // add user_id:number inside () and change user_id to userId>number
    getCart: async (user_id:number) => {
        //const result = await pool.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [1]);
        //to fix get user id to cart
        const result = await pool.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [user_id]);
        return result;
    },
    //old code save here
/*     addCourse: async (course_id: number) => {
        const result = await pool.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [1, course_id]);
        return result;
    }, */
    //new code, to add a course to the cart and change course?id to user_id,
    // and chnge _id to courseId: number, userId:number 4/26 new code
        addCourse: async (courseId: number, userId:number) => {
        //console.log(courseId);
        //console.log(userId);
        const result = await pool.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [userId, courseId]);
        return result;
},
    //add new code for remove and clear cart change _id to courseId: number, userId:number
    removeCourse: async (courseId: number, userId:number) => {
        const result = await pool.query('DELETE FROM cart WHERE id_course = $1 AND id_user = $2', [courseId, userId]);
        return result;
    },
    clearCart: async (userId:number) => {
        const result = await pool.query('DELETE FROM cart WHERE id_user = $1', [userId]);
        return result;
    },

};

  


export default cart;