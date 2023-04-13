import pool from '../db.js'

const user = {
    registerUser: async (user: any) => {
        const result = await pool.query(
            'INSERT INTO users (firstname, lastname, email, username, passwd, street_address, postal_code, city, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [user.firstname, user.lastname, user.email, user.username, user.passwd, user.street_address, user.postal_code, user.city, user.phone_number]);
        return result;
    },
}
export default user;