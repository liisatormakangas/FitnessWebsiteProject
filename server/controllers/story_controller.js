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
    story_model_js_1.default.getStoryById(parseInt(req.params.id)).then((data) => {
        res.send(data.rows[0]);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving stories.'
        });
    });
});
exports.default = controller;
