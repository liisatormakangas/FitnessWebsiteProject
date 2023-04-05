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

export default controller;
