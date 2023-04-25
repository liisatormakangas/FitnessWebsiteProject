import express from 'express';
import jwt from 'jsonwebtoken';
import story from '../models/story_model.js';

const controller = express.Router();
const secretKey = process.env.SECRET_KEY as string;

controller.get('/', (req, res) => {
    story.getAllStories().then((data: any) => {      
        res.send(data.rows);        
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.'
        });
    });
});

controller.get('/:id', (req, res) => {
    //get token from request header
    const token = req.headers.authorization;

    if (!token || token.toLowerCase() === "bearer null") {
        res.status(401).json({
            message: 'Please login or register'
        });
    } else {
        //get user id from token
        const decoded = jwt.decode(token.split(' ')[1]);
        const userId = (decoded as any).userid;

        story.getStoryById(parseInt(req.params.id), userId).then((data: any) => {
            res.send(data.rows[0]);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.' + error.message
        });
    });
}
});


controller.post('/new', (req, res) => {
    story.addNewStory(req.body, ).then((data: any) => {        
        res.send(data.rows);
        console.log(data.rows);
        
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while posting story.'
        });
    });
});

    //Post a comment to a story
controller.post('/newcomment', (req, res) => {
    const token = req.headers.authorization;

    if (!token || token.toLowerCase() === "bearer null") {
        res.status(401).json({
            message: 'Please login or register'
        });
        return;
    }
    //get user id and username from token
    const decoded = jwt.decode(token.split(' ')[1]);
    const userId = (decoded as any).userid;
    const username = (decoded as any).username;

    story.addStoryComment(req.body, userId).then((data: any) => {  
        data.rows.forEach((row: any) => {            
            row.username = username;
        });
        res.send(data.rows);
        console.log(data.rows);
        
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while posting story comment.'
        });
    });
});

    // Delete a comment from a story
controller.delete('/deletecomment/:id', (req, res) => {
    story.deleteStoryComment(parseInt(req.params.id)).then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while deleting story comment.'
        });
    });
});

controller.post('/newreaction', (req, res) => {
    story.addStoryReaction(req.body).then((data: any) => {        
        res.send(data.rows);
        console.log(data.rows);
        
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while posting new story reaction.'
        });
    });
});

controller.delete('/deletereaction/:story/:type', (req, res) => {    
    //TODO: get user_id from token with jwt.decode
    const user_id = 1;
    story.deleteStoryReaction(user_id, parseInt(req.params.story), req.params.type).then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while deleting story reaction.'
        });
    });
});


export default controller;
