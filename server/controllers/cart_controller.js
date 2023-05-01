"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
controller.post('/add-to-cart', (req, res) => {
    //new code, to get user id and course id 4/26 new code
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    //4/26 new code change the order of userId and courseId
    cart_model_js_1.default.addCourse(userId, courseId).then((data) => {
        res.send(data.rows[0]);
    }).catch((error) => {
        res.status(500).send({
            message: 'Some error occurred while adding course to cart.'
        });
    });
});
//remove course from cart 4/30
controller.post('/remove-from-cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    try {
        yield cart_model_js_1.default.removeCourse(userId, courseId);
        res.status(200).send({
            message: 'Course has been removed from cart!'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Some error occurred while removing course from cart.'
        });
    }
}));
exports.default = controller;
