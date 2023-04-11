"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_model_js_1 = __importDefault(require("../models/cart_model.js"));
const controller = express_1.default.Router();
controller.get('/', (req, res) => {
    cart_model_js_1.default.getCart().then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving cart.'
        });
    });
});
controller.post('/add/:course_id', (req, res) => {
    cart_model_js_1.default.addCourse(parseInt(req.params.course_id)).then((data) => {
        res.send(data.rows[0]);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while adding course to cart.'
        });
    });
});
exports.default = controller;
