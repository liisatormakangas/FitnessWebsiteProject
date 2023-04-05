import pool from '../db.js'

const story = {
    getAllStories: async () => {
        const result = await pool.query('SELECT * FROM stories');
        return result;
    },
    getStoryById: async (id: number) => {
        const result = await pool.query('SELECT * FROM stories WHERE id_story = $1', [id]);
        return result;
    },
}

export default story;