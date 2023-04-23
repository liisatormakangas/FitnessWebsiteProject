import express from 'express';
import story from '../models/story_model.js';

const controller = express.Router();

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
    story.getStoryById(parseInt(req.params.id)).then((data: any) => {
        res.send(data.rows[0]);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.'
        });
    });
});


controller.post('/new', (req, res) => {
    story.addNewStory(req.body).then((data: any) => {        
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
    story.addStoryComment(req.body).then((data: any) => {        
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
            message: 'Some error occurred while posting story comment.'
        });
    });
});

controller.delete('/deletereaction/:id', (req, res) => {
    story.deleteStoryComment(parseInt(req.params.id)).then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while deleting story comment.'
        });
    });
});

    // Count the number of comments for a story

export default controller;
