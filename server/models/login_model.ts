import pool from '../db.js'
import bcrypt from 'bcryptjs';

const loginUser = async (username:any, password:any) => {

    // Query the database to check if the username exists
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await pool.query(query, [username]);

    if (result.rowCount === 0) {
      // If username does not exist, return an error 
      throw new Error('Invalid username or password');
    }

    // Compare password with the hashed password stored in the database
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.passwd);

    if (!isMatch) {
      // If password does not match, return an error
      throw new Error('Invalid username or password');
    }

    // If username and password match, return the user object
    return user;
  
};
  export default loginUser;