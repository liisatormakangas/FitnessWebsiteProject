"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const story_model_js_1 = __importDefault(require("../models/story_model.js"));
const controller = express_1.default.Router();
controller.get('/', (req, res) => {
    story_model_js_1.default.getAllStories().then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.'
        });
    });
});
controller.get('/:id', (req, res) => {
    //get token from request header
    const token = req.headers.authorization;
    if (token === "bearer null") {
        res.status(401).json({
            message: 'Please login or register'
        });
    }
    else {
        story_model_js_1.default.getStoryById(parseInt(req.params.id)).then((data) => {
            res.status(200).send(data.rows[0]);
        }).catch((error) => {
            res.status(500).json({
                message: 'Some error occurred while retrieving stories.'
            });
        });
    }
});
controller.post('/new', (req, res) => {
    story_model_js_1.default.addNewStory(req.body).then((data) => {
        res.send(data.rows);
        console.log(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while posting story.'
        });
    });
});
//Post a comment to a story
controller.post('/newcomment', (req, res) => {
    story_model_js_1.default.addStoryComment(req.body).then((data) => {
        res.send(data.rows);
        console.log(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while posting story comment.'
        });
    });
});
// Delete a comment from a story
controller.delete('/deletecomment/:id', (req, res) => {
    story_model_js_1.default.deleteStoryComment(parseInt(req.params.id)).then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while deleting story comment.'
        });
    });
});
// Update a comment from a story
/* controller.put('/updatecomment', (req, res) => {
    story.updateStoryComment(req.body).then((data: any) => {
        res.send(data.rows);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while updating story comment.'
        });
    });
}); */
exports.default = controller;
