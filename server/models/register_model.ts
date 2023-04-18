import { query } from 'express';
import pool from '../db.js'
import bcrypt from 'bcryptjs';

const user = {
    registerUser: async (user_data: any) => {
        const query = `INSERT INTO users (
            firstname,
            lastname,
            email,
            username,
            passwd,
            street_address,
            postal_code,
            city,
            phone_number
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
          const params = [
            user_data.firstname,
            user_data.lastname,
            user_data.email,
            user_data.username,
            user_data.passwd,
            user_data.street_address,
            user_data.postal_code,
            user_data.city,
            user_data.phone_number
            ];
        const result = await pool.query(query,params);
        return result;
    },
    loginUser: async (username:any, password:any) => {
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
      },
    };

export default user;
