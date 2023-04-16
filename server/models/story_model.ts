import pool from '../db.js'

const story = {
    getAllStories: async () => {
        const result = await pool.query('SELECT * FROM stories');
        return result;
    },
    getStoryById: async (id: number) => {
        const result = await pool.query('SELECT * FROM stories WHERE id_story = $1', [id]);

        // If the story exists, get the comments for that story        
        if(result.rowCount > 0) {
            const commentResult = await pool.query('SELECT * FROM comments WHERE id_story = $1', [id]);
            result.rows[0].comments = commentResult.rows;
        }
        return result;
    },
    addNewStory: async (body: any) => {      
        const result = await pool.query('insert into stories (author, title, story, blog_date, image_name) VALUES ($1, $2, $3, $4) RETURNING *', [body.author, body.title, body.story, body.blog_date, body.image_name]);       
        return result;
    },
    // post a comment to a story
    addStoryComment: async (body: any) => {
        const result = await pool.query('insert into comments (id_story, id_user, content, date_added) VALUES ($1, $2, $3, $4) RETURNING *', [body.id_story, body.id_user, body.content, body.date_added]);       
        return result;
    },
    // delete a comment from a story
    deleteStoryComment: async (id: number) => {
        const result = await pool.query('DELETE FROM comments WHERE id_response = $1', [id]);
        return result;
    },
    // update a comment from a story
    /* updateStoryComment: async (body: any) => {
        const result = await pool.query('UPDATE comments SET content = $1 WHERE id_response = $2', [body.content, body.id_response]);
        return result;
    } */
}

export default story;