"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_model_js_1 = __importDefault(require("../models/cart_model.js"));
const controller = express_1.default.Router();
//old code fot 4/26 before find out couse id and uset id use wrong
controller.get('/', (req, res) => {
    //to get user id
    const userId = req.body.id_user;
    console.log(req.body.id_user);
    console.log(req.body);
    cart_model_js_1.default.getCart(userId).then((data) => {
        res.send(data.rows);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while retrieving cart.'
        });
    });
});
//here is old code, for reference in cse mess up
/* controller.post('/add/:course_id', (req, res) => {
    cart.addCourse(parseInt(req.params.course_id)).then((data: any) => {
        res.send(data.rows[0]);
    }).catch((error: any) => {
        res.status(500).send({
            message: 'Some error occurred while adding course to cart.'
        });
    });
}); */
controller.post('/add-to-cart', (req, res) => {
    //new code, to get user id and course id 4/26 new code
    /*     const userId = req.body.userId;
        const courseId = req.body.courseId; */
    //4-28 new code
    const { userId, courseId } = req.body;
    //4/26 new code change the order of userId and courseId
    cart_model_js_1.default.addCourse(courseId, userId).then((data) => {
        res.send(data.rows[0]);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while adding course to cart.'
        });
    });
});
exports.default = controller;
