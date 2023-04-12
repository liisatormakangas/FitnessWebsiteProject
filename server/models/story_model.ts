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
    addNewStory: async (body: any) => {      
        const result = await pool.query('insert into stories (author, title, story, blog_date, image_name) VALUES ($1, $2, $3, $4) RETURNING *', [body.author, body.title, body.story, body.blog_date, body.image_name]);       
        return result;
    }
}

export default story;